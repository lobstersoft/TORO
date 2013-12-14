<%@ Application Language="C#" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Reflection" %>
<%@ Import Namespace="Sage.Platform.Application" %>
<%@ Import Namespace="Sage.Platform.Application.Diagnostics" %>
<%@ Import Namespace="log4net" %>
<%@ Import Namespace="log4net.Config" %>
<%@ Import Namespace="Sage.Integration.Messaging" %>
<%@ Import Namespace="Sage.Platform.Application.UI.Web" %>
<%@ Import Namespace="Sage.Platform.Diagnostics" %>

<script runat="server">

    //#define EnableNHibernateProfiler

    private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    void Application_Start(object sender, EventArgs e)
    {
        try
        {
            var path = Server.MapPath("~/log4net.config");
            XmlConfigurator.Configure(new FileInfo(path));

#if EnableNHibernateProfiler
        HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
#endif

            MessagingService.UnhandledException += MessagingServiceOnUnhandledException;

            HierarchicalRuntime.Instance.Initialize();

            Log.InfoEx("SalesLogix SData Portal started.", EventIds.AdHocEvents.InfoApplicationStart);

        }
        catch (Exception ex)
        {
            Log.ErrorEx("There was an error in Application_Start()", EventIds.AdHocEvents.ErrApplicationStart, ex);
            throw; // Re-throw
        }
    }

    void Application_End(object sender, EventArgs e)
    {
        try
        {
            MessagingService.UnhandledException -= MessagingServiceOnUnhandledException;
        }
        catch (Exception ex)
        {
            Log.WarnEx("There was an error in Application_End()", EventIds.AdHocEvents.WarnApplicationEnd, ex);
        }

        Log.InfoEx("SalesLogix SData Portal ended.", EventIds.AdHocEvents.InfoApplicationEnd);
    }

    void Application_Error(object sender, EventArgs e)
    {
        Exception fullException = null;
        var logged = false;
        string sSlxErrorId = null;
        
        try
        {            
            var exception = Server.GetLastError();
            if (exception == null) return;        
            
            fullException = exception;                       
            
            var eKind = ErrorHelper.GetTargetedException(fullException, out exception);
            var eMitigationType = ErrorHelper.GetMitigationType(eKind, Request);
            sSlxErrorId = ErrorHelper.GetNewLoggingId();

            ErrorHelper.LogException(fullException, Request, Log, "SalesLogix SData Portal unhandled exception", sSlxErrorId);

            logged = true;
            
            Server.ClearError();

            var oErrorMessage = ErrorHelper.GetErrorMessage(exception, Request, eKind, sSlxErrorId, true, true,
                                                            null, Request.Url.ToString(),
                                                            true, ErrorHelper.LogMode.Client, false,
                                                            null, true);
            
            // Note: Just the act of accessing the Session object (e.g. Session.*) can throw an
            // HttpException in certain scenarios with the message "Session state is not available in this context."
            // IsAuthenticated() relies on access to the current Session.
            var session = ErrorHelper.GetCurrentHttpSessionState(this);            
            if (session != null && IsAuthenticated() == false)
            {
                var eLoginMitigationType = ErrorHelper.LooksLikeAjaxRequest(Request)
                                               ? ErrorHelper.MitigationType.AjaxLoginRedirect
                                               : ErrorHelper.MitigationType.LoginRedirect;
                if (eMitigationType != eLoginMitigationType)
                {
                    Log.WarnFormat(
                        "The current user is not authenticated. Switching from a mitigation of {0} ({1}) to {2} ({3}).",
                        eMitigationType, (int) eMitigationType, eLoginMitigationType, (int) eLoginMitigationType);
                    eMitigationType = eLoginMitigationType;
                }
            }

            // Mitigate the scenario
            switch (eMitigationType)
            {
                case ErrorHelper.MitigationType.LoginRedirect:
                case ErrorHelper.MitigationType.AjaxLoginRedirect:

                    // Abandon the Session
                    if (session != null)
                    {
                        session.Abandon();
                    }

                    Response.ClearHeaders();
                    Response.ClearContent();
                    Response.Clear();
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    Response.StatusDescription = exception.Message;
                    Response.TrySkipIisCustomErrors = true;
                    // NOTE: AppendHeader() must be used for IIS6 instead of Response.Headers.Add()
                    Response.AppendHeader(ErrorHelper.ErrorIdHttpHeader, sSlxErrorId);
                    Response.ContentType = "text/plain";
                    Response.Write(exception.Message);
                    break;

                default:

                    if (eMitigationType == ErrorHelper.MitigationType.ErrorContent)
                    {
                        var path = Request.AppRelativeCurrentExecutionFilePath;
                        if (!string.IsNullOrEmpty(path) && ((path == "~/" || path.EndsWith("Default.aspx", StringComparison.OrdinalIgnoreCase))))
                        {
                            // This service portal only contains one page: Default.aspx; if the error is from this page then send
                            // back the error to that page, otherwise, send the error as an HTTP response.
                            Response.Write(string.Format("<html><body>{0}</body></html>",
                                                         oErrorMessage.ToString(MessageProperty.FormatType.HtmlEncoded)));
                            return;
                        }
                        // else, since this is a service portal we're going to assume that the request is not from a page.
                        // An aspx can be used to expose an HTTP handler, so we cannot make assumptions regarding the path
                        // and we cannot depend on the XMLHttpRequest header always existing for a service portal HTTP request
                        // (the request itself may be coming from the server rather than a client, etc.).
                    }

                    Response.ClearHeaders();
                    Response.ClearContent();
                    Response.Clear();
                    Response.StatusCode = (eMitigationType != ErrorHelper.MitigationType.ErrorContent)
                                              ? (int)eMitigationType
                                              : (int)HttpStatusCode.InternalServerError;
                    Response.StatusDescription = string.Format("Internal Server Error - {0}", eMitigationType);
                    Response.TrySkipIisCustomErrors = true;
                    // NOTE: AppendHeader() must be used for IIS6 instead of Response.Headers.Add()
                    Response.AppendHeader(ErrorHelper.ErrorIdHttpHeader, sSlxErrorId);

                    string sLogData;
                    if (ErrorHelper.GetExceptionLogData(Request, exception, fullException, sSlxErrorId,
                                                        ErrorHelper.LogMode.Client,
                                                        eMitigationType, out sLogData))
                    {
                        // JSON
                        Response.ContentType = "application/json";
                        Response.Write(sLogData);
                    }
                    else
                    {
                        // Plain text
                        Response.ContentType = "text/plain";
                        Response.Write(oErrorMessage.ToString(MessageProperty.FormatType.Text));
                    }
                    break;
            }
            
            CompleteRequest();
        }
        catch (Exception ex)
        {
            Log.ErrorEx("There was an error in Application_Error()", EventIds.AdHocEvents.ErrApplicationError, ex);

            if (logged || fullException == null) return;
            
            if (sSlxErrorId == null)
            {
                sSlxErrorId = ErrorHelper.GetNewLoggingId();
            }
            
            Log.Error(ErrorHelper.AppendSlxErrorId("SalesLogix SData Portal unhandled exception", sSlxErrorId),
                      fullException);
        }
    }

    void Session_Start(object sender, EventArgs e)
    {
        Log.InfoEx("SalesLogix SData Portal session start.", EventIds.AdHocEvents.InfoSessionStart);

        try
        {
            HierarchicalRuntime.Instance.EnsureSessionWorkItem();
        }
        catch (Exception ex)
        {
            Log.ErrorEx("There was an error in Session_Start()", EventIds.AdHocEvents.ErrSessionStart, ex);
            throw; // Re-throw
        }
    }

    void Session_End(object sender, EventArgs e)
    {
        try
        {
            HierarchicalRuntime.Instance.TerminateSessionWorkItem(Session);
        }
        catch (Exception ex)
        {
            Log.WarnEx("There was an error in Session_End()", EventIds.AdHocEvents.WarnSessionEnd, ex);
        }

        Log.InfoEx("SalesLogix SData Portal session end.", EventIds.AdHocEvents.InfoSessionEnd);
    }

    /// <summary>
    /// Determines whether the current user is authenticated.
    /// </summary>
    /// <returns>
    ///   <c>true</c> if the current user is authenticated; otherwise, <c>false</c>.
    /// </returns>
    private static bool IsAuthenticated()
    {
        try
        {
            if (ApplicationContext.Current != null && ApplicationContext.Current.Services != null)
            {
                var authProvider = ApplicationContext.Current.Services.Get<IAuthenticationProvider>();
                return authProvider != null && authProvider.IsAuthenticated;
            }
        }
        catch (Exception ex)
        {
            Log.Warn("The call to IsAuthenticated() failed.", ex);
        }
        return false;
    }    

    /// <summary>
    /// Handles the MessagingService.UnhandledException event.
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="Sage.Integration.Messaging.DiagnosesExceptionEventArgs"/> instance containing the event data.</param>
    private static void MessagingServiceOnUnhandledException(object sender, DiagnosesExceptionEventArgs e)
    {
        if (e == null) return;
        if (e.Exception == null) return;

        try
        {
            ErrorHelper.LogMessagingServiceException(e.Exception, ErrorHelper.GetCurrentHttpRequest(), Log);
        }
        catch (Exception ex)
        {
            Log.Error("There was an error in MessagingServiceOnUnhandledException()", ex);
        }
    }    

</script>
