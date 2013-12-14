#define EnableDynamicFormSupport
//#define EnableNHibernateProfiler

using System;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Web;
using System.Web.Configuration;
using System.Web.Security;
using Dropthings.Web.Util;
using Sage.Integration.Messaging;
using Sage.Platform.Application;
using Sage.Platform.Application.Diagnostics;
using Sage.Platform.Application.UI.Web;
using Sage.Platform.Diagnostics;
using Sage.SalesLogix;
using log4net;
using log4net.Config;

#if EnableDynamicFormSupport
    using System.Web.Hosting;
    using Sage.Platform.QuickForms.WebFormGen.Web;
#endif

public class Global : HttpApplication
{
    private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    #region Application

    // ReSharper disable UnusedMember.Local
    // ReSharper disable UnusedParameter.Local

    /// <summary>
    /// Handles the BeginRequest event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    private void Application_BeginRequest(object sender, EventArgs e)
    {
        // NOTE: Do [not] add structured exception handling here...as this method is called for every request (performance).
        if (Request.HttpMethod == "GET")
        {
            AddScriptDeferResponseFilter();
        }
    }

    /// <summary>
    /// Handles the Start event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    private void Application_Start(object sender, EventArgs e)
    {
        try
        {
            string path = Server.MapPath("~/log4net.config");
            XmlConfigurator.Configure(new FileInfo(path));

            MessagingService.UnhandledException += MessagingServiceOnUnhandledException;

            if (Log.IsInfoEnabled)
            {
                Log.Info("SalesLogix Web Client initializing.");
            }

            InitializeSalesLogix();

            // NOTE: To use NHibernate Profiler ( http://nhprof.com )
            // 1. Add a reference to HibernatingRhinos.NHibernate.Profiler.Appender.dll assembly
            //    (Do not overwrite log4net.dll if prompted.)
            // 2. Uncomment the #define EnableNHibernateProfiler at the top of this Visual C# source file.
#if EnableNHibernateProfiler
        HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
#endif

            // WFG comment the #define EnableDynamicFormSupport at the top of this Visual C# source file to disable dynamic form support.
#if EnableDynamicFormSupport
        HostingEnvironment.RegisterVirtualPathProvider(new IFileSystemVirtualPathProvider());
#endif

            HierarchicalRuntime.Instance.Initialize();

            if (Log.IsInfoEnabled)
            {
                Log.InfoEx("SalesLogix Web Client started.", EventIds.AdHocEvents.InfoApplicationStart);
            }

        }
        catch (Exception ex)
        {
            Log.ErrorEx("There was an error in Application_Start()", EventIds.AdHocEvents.ErrApplicationStart, ex);
            throw; // Re-throw
        }
    }

    /// <summary>
    /// Handles the End event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    private void Application_End(object sender, EventArgs e)
    {
        try
        {
            MessagingService.UnhandledException -= MessagingServiceOnUnhandledException;
        }
        catch (Exception ex)
        {
            Log.WarnEx("There was an error in Application_End()", EventIds.AdHocEvents.WarnApplicationEnd, ex);
        }

        if (Log.IsInfoEnabled)
        {
            Log.InfoEx("SalesLogix Web Client ended.", EventIds.AdHocEvents.InfoApplicationEnd);
        }
    }

    /// <summary>
    /// Handles the Error event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    private void Application_Error(object sender, EventArgs e)
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

            ErrorHelper.LogException(fullException, Request, Log, "SalesLogix Web Client unhandled exception",
                                     sSlxErrorId);

            logged = true;

            Server.ClearError();

            var oErrorMessage = ErrorHelper.GetErrorMessage(exception, Request, eKind, sSlxErrorId, true, true,
                                                            Resources.SalesLogix.MailDetailsLink, Request.Url.ToString(),
                                                            true, ErrorHelper.LogMode.Client, true,
                                                            Resources.SalesLogix.ReturnLink, true);

            // Note: Just the act of accessing the Session object (e.g. Session.*) can throw an
            // HttpException in certain scenarios with the message "Session state is not available in this context."
            // IsAuthenticated() relies on access to the current Session.
            var session = ErrorHelper.GetCurrentHttpSessionState(this);
            if (session != null && IsAuthenticated() == false)
            {
                var path = Request.AppRelativeCurrentExecutionFilePath;
                var isLoginPage = !string.IsNullOrEmpty(path) &&
                                  path.EndsWith("Login.aspx", StringComparison.InvariantCultureIgnoreCase);
                // If the Exception came from the login page, go to error page instead; otherwise,
                // the user could get into an unrecoverable loop.)
                if (isLoginPage == false)
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
            }

            // Mitigate the scenario
            switch (eMitigationType)
            {
                case ErrorHelper.MitigationType.AjaxLoginRedirect:
                    /* Send an Ajax HTTP response status of 575 (handled in Sage.Utility.ErrorHandler.js)
                     * with the response header named "Sage-SalesLogix-Exception-Redirect" with a value of "Login.aspx". */

                    // Abandon the Session and SignOut of FormsAuthentication (if applicable).
                    // SignOut() will also set the FormsAuthentication cookie value to an empty string.
                    SignOut();

                    HttpCookie authCookie = null;
                    if (FormsAuthentication.IsEnabled)
                    {
                        // Save the auth cookie since all cookies will be cleared in ClearHeaders().
                        // .SLXAUTH=; expires=Tue, 12-Oct-1999 05:00:00 GMT; path=/; HttpOnly
                        authCookie = Response.Cookies[FormsAuthentication.FormsCookieName];
                    }

                    // Ajax redirect
                    Log.Debug("Redirect to Login.aspx (Ajax AuthTokenNullException)");

                    Response.ClearHeaders();
                    Response.ClearContent();
                    Response.Clear();
                    Response.StatusCode = (int)eMitigationType;
                    Response.StatusDescription = eMitigationType.ToString();
                    Response.TrySkipIisCustomErrors = true;
                    // NOTE: AppendHeader() must be used for IIS6 instead of Response.Headers.Add()
                    Response.AppendHeader(ErrorHelper.ExceptionRedirectHttpHeader, "Login.aspx");
                    Response.AppendHeader(ErrorHelper.ErrorIdHttpHeader, sSlxErrorId);
                    Response.ContentType = "text/plain";

                    if (authCookie != null)
                    {
                        // Set .SLXAUTH cookie to an empty value
                        // .SLXAUTH=; expires=Tue, 12-Oct-1999 05:00:00 GMT; path=/; HttpOnly
                        Response.Cookies.Add(authCookie);
                    }

                    Response.Write(exception.Message);
                    break;

                case ErrorHelper.MitigationType.LoginRedirect:
                    /* Send a Response.Redirect("Login.aspx"). */

                    // Abandon the Session and SignOut of FormsAuthentication (if applicable).
                    SignOut();

                    // Redirect
                    Log.Debug("Redirect to Login.aspx (AuthTokenNullException)");
                    Response.Redirect("Login.aspx", false);
                    break;

                case ErrorHelper.MitigationType.ErrorContent:
                    /* Send error content in the form of raw HTML. */

                    Log.DebugFormat("Write the error page back to the response. URL: {0}. Referrer: {1}", Request.Url,
                                    Request.UrlReferrer);
                    Response.Write(GetErrorPageHtml(oErrorMessage));
                    break;

                default:
                    /* Send an Ajax HTTP response status of 57x-58x with exception content (handled in Sage.Utility.ErrorHandler.js). */

                    Log.DebugFormat("Write the response back to the XMLHttpRequest object with a StatusCode of {0} ({1})",
                                    (int)eMitigationType, eMitigationType);

                    Response.ClearHeaders();
                    Response.ClearContent();
                    Response.Clear();
                    Response.StatusCode = (int)eMitigationType;
                    Response.StatusDescription = eMitigationType.ToString();
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

            Log.Error(ErrorHelper.AppendSlxErrorId("SalesLogix Web Client unhandled exception", sSlxErrorId),
                      fullException);
        }
    }

    // ReSharper restore UnusedParameter.Local
    // ReSharper restore UnusedMember.Local

    #endregion

    #region Session

    // ReSharper disable UnusedMember.Local
    // ReSharper disable UnusedParameter.Local

    /// <summary>
    /// Handles the Start event of the Session control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    private void Session_Start(object sender, EventArgs e)
    {
        if (Log.IsInfoEnabled)
        {
            Log.InfoEx(
                string.Format("SalesLogix Web Client session start for user '{0}'.",
                              Thread.CurrentPrincipal.Identity.Name),
                EventIds.AdHocEvents.InfoSessionStart);
        }

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

    /// <summary>
    /// Handles the End event of the Session control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    private void Session_End(object sender, EventArgs e)
    {
        try
        {
            HierarchicalRuntime.Instance.TerminateSessionWorkItem(Session);
        }
        catch (Exception ex)
        {
            Log.WarnEx("There was an error in Session_End()", EventIds.AdHocEvents.WarnSessionEnd, ex);
        }

        if (Log.IsInfoEnabled)
        {
            Log.InfoEx(
                string.Format("SalesLogix Web Client session end for user '{0}'.", Thread.CurrentPrincipal.Identity.Name),
                EventIds.AdHocEvents.InfoSessionEnd);
        }
    }

    // ReSharper restore UnusedParameter.Local
    // ReSharper restore UnusedMember.Local

    #endregion

    #region Private

    private const string ErrorPageHtmlFmt =
        @"<html xmlns=""http://www.w3.org/1999/xhtml"">
<head runat=""server"">
    <title>{0}</title>
    <link rel=""stylesheet"" type=""text/css"" href=""css/sageStyles.css"" />
    <style type=""text/css"">
        .msg {{ padding: 50px 50px; width: 800px; }}
        .header {{ font-size : 150%; color: #01795E; }}
    </style>
</head>
<body>
  <div class=""msg"">
    <p class=""header"">{1}</p>
    <p>{2}</p>
  </div>
</body>
</html>";

    /// <summary>
    /// Adds the ScriptDeferFilter.
    /// </summary>
    private void AddScriptDeferResponseFilter()
    {
        string path = Request.AppRelativeCurrentExecutionFilePath;
        if (!path.EndsWith(".aspx", StringComparison.OrdinalIgnoreCase)) return;

        // skip these pages - no other pages are named the same, can just check end
        if (path.EndsWith("ViewAttachment.aspx", StringComparison.OrdinalIgnoreCase)
            || path.EndsWith("ViewDocument.aspx", StringComparison.OrdinalIgnoreCase)) return;

        Response.Filter = new ScriptDeferFilter(Response);
    }

    /// <summary>
    /// Gets the error page HTML.
    /// </summary>
    /// <param name="errorMessage">The error message.</param>
    /// <returns></returns>
    private static string GetErrorPageHtml(ErrorMessage errorMessage)
    {
        return string.Format(ErrorPageHtmlFmt,
                             Resources.SalesLogix.ExceptionPageTitle,
                             Resources.SalesLogix.CannotCompleteRequest,
                             errorMessage.ToString(MessageProperty.FormatType.HtmlEncoded));
    }

    /// <summary>
    /// Initializes SalesLogix
    /// </summary>
    private void InitializeSalesLogix()
    {
        string connectionConfigPath = Server.MapPath("~/connection.config");
        if (!File.Exists(connectionConfigPath)) return;
        var connectionInfo = SLXConnectionInfo.ReadFromFile(connectionConfigPath);
        int connectionPort;
        int.TryParse(connectionInfo.Port, out connectionPort);
        SLXSystemPool.Initialize(connectionInfo.Server, connectionPort);
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

    /// <summary>
    /// Abandon's the Session and signs out of Forms authentication (if Forms authentication is enabled).
    /// </summary>
    private void SignOut()
    {
        try
        {
            // Note: Just the act of accessing the Session object (e.g. Session.*) can throw an
            // HttpException in certain scenarios with the message "Session state is not available in this context."
            var session = ErrorHelper.GetCurrentHttpSessionState(this);
            if (session != null)
            {
                session.Abandon();
            }
            if (FormsAuthentication.IsEnabled)
            {
                // Nulls the .SLXAUTH cookie.
                FormsAuthentication.SignOut();
            }
        }
        catch (Exception ex)
        {
            Log.Warn("There was an error in SignOut()", ex);
        }
    }

    #endregion

    #region Public

    /// <summary>
    /// Gets the locale.
    /// </summary>
    public static string Locale
    {
        get
        {
            var cultureInfo = CultureInfo.CurrentUICulture;
            var culture = cultureInfo.ToString();
            return culture.ToLower();
        }
    }

    // ReSharper disable UnusedMember.Global

    /// <summary>
    /// Gets the alarm poll interval.
    /// </summary>
    public static int AlarmPollInterval
    {
        get
        {
            int pollInterval;
            return int.TryParse(WebConfigurationManager.AppSettings["AlarmPollInterval"], out pollInterval)
                       ? pollInterval
                       : 1;
        }
    }

    // ReSharper restore UnusedMember.Global

    #endregion
}