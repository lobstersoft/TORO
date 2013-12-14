﻿using System;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Web;
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

// ReSharper disable CheckNamespace
// ReSharper disable UnusedMember.Local
// ReSharper disable InconsistentNaming
// ReSharper disable UnusedParameter.Local

public class Global : HttpApplication
{
    static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    /// <summary>
    /// Handles the Start event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    void Application_Start(object sender, EventArgs e)
    {
        try
        {
            string path = Server.MapPath("~/log4net.config");
            XmlConfigurator.Configure(new FileInfo(path));

            MessagingService.UnhandledException += MessagingServiceOnUnhandledException;

            if (Log.IsInfoEnabled)
            {
                Log.Info("SalesLogix Customer Portal initializing.");
            }

            InitializeSalesLogix();

            /* ========================== NHibernate Profiler ========================== */
            /* NOTE: To use NHibernate Profiler ( http://nhprof.com )
             * 1. Add a reference to HibernatingRhinos.NHibernate.Profiler.Appender.dll
             *    assembly (Do not overwrite log4net.dll if prompted).
             * 2. Uncomment following line: */
            //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
            /* ========================== NHibernate Profiler ========================== */

            /* ======================= Web Form Generation (WFG) ======================= */
            // WFG comment line below to disable dynamic form support
            // NOTE: The globalization configuration setting must also be modified in web.config.
            //HostingEnvironment.RegisterVirtualPathProvider(new Sage.Platform.QuickForms.WebFormGen.Web.IFileSystemVirtualPathProvider());
            /* ======================= Web Form Generation (WFG) ======================= */

            HierarchicalRuntime.Instance.Initialize();

            if (Log.IsInfoEnabled)
            {
                Log.InfoEx("SalesLogix Customer Portal started.", EventIds.AdHocEvents.InfoApplicationStart);
            }
        }
        catch (Exception ex)
        {
            Log.ErrorEx("There was an error in Application_Start()", EventIds.AdHocEvents.ErrApplicationStart, ex);
            throw; // Re-throw
        }
    }

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
    /// Handles the End event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
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

        if (Log.IsInfoEnabled)
        {
            Log.InfoEx("SalesLogix Customer Portal ended.", EventIds.AdHocEvents.InfoApplicationEnd);
        }
    }

    /// <summary>
    /// Handles the Error event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
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

            ErrorHelper.LogException(fullException, Request, Log, "SalesLogix Customer Portal unhandled exception", sSlxErrorId);

            logged = true;

            Server.ClearError();

            var sTextMessage = ErrorHelper.GetErrorMessageContent(exception, Request, eKind, sSlxErrorId, false, false,
                                                                  string.Empty, Request.Url.ToString());
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

                    var sHtml = string.Format(_errorPageHtmlFmt,
                                                     Resources.SalesLogix.ExceptionPageTitle,
                                                     Resources.SalesLogix.CannotCompleteRequest,
                                                     HttpUtility.HtmlEncode(sTextMessage).Replace(Environment.NewLine, "<br />"),
                                                     Resources.SalesLogix.Actions,
                                                     Resources.SalesLogix.ReturnLink);
                    Response.Write(sHtml);
                    break;

                default:
                    /* Send an Ajax HTTP response status of 576, 577, 578, 579 or 580 with exception content (handled in Sage.Utility.ErrorHandler.js). */

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
                        Response.Write(sTextMessage);
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

            Log.Error(ErrorHelper.AppendSlxErrorId("SalesLogix Customer Portal unhandled exception", sSlxErrorId),
                      fullException);
        }
    }

    /// <summary>
    /// Handles the Start event of the Session control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    void Session_Start(object sender, EventArgs e)
    {
        if (Log.IsInfoEnabled)
        {
            Log.InfoEx(
                string.Format("SalesLogix Customer Portal session start for user '{0}'.",
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

        if (Log.IsInfoEnabled)
        {
            Log.InfoEx(
                string.Format("SalesLogix Customer Portal session end for user '{0}'.", Thread.CurrentPrincipal.Identity.Name),
                EventIds.AdHocEvents.InfoSessionEnd);
        }
    }

    /// <summary>
    /// Handles the BeginRequest event of the Application control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    void Application_BeginRequest(object sender, EventArgs e)
    {        
        // NOTE: Do [not] add structured exception handling here...as this method is called for every request (performance).
        if (Request.HttpMethod == "GET")
            AddScriptDeferResponseFilter();
    }

    public static string Locale
    {
        get
        {
            System.Globalization.CultureInfo currentUICulture = System.Globalization.CultureInfo.CurrentUICulture;
            string culture = currentUICulture.ToString();
            return culture.ToLower();
        }
    }

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

    private const string _errorPageHtmlFmt = @"<html xmlns=""http://www.w3.org/1999/xhtml"">
<head runat=""server"">
    <title>{0}</title>
    <link rel=""stylesheet"" type=""text/css"" href=""css/sageStyles.css"" />
    <style type=""text/css"">
    .msg {{ padding: 50px 50px; width: 800px; }}
    .header {{ font-size : 150%; color: #01795E; }}
    .errormsg {{ }}
    .action {{ font-size : 100%; color: #01795E; padding: 30px 0px 0px 0px; border-bottom: solid 1px #01795E; }}
    .actionitem {{ padding-bottom:10px; }}
    </style>
</head>
<body>
  <div class=""msg"">
    <p class=""header"">{1}</p>
    <p class=""errormsg"">{2}</p>
    <p class=""action"">{3}</p>
    <ul>
      <li class=""actionitem""><a href=""Default.aspx"">{4}</a></li>
    </ul>
  </div>
</body>
</html>";
}