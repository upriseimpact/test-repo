using Microsoft.Owin;
using Owin;
using System;

//[assembly: OwinStartupAttribute(typeof(Uprise.Startup))]
namespace Uprise
{
    public partial class Startup
    {
        //// The Client ID is used by the application to uniquely identify itself to Azure AD.
        //string clientId = System.Configuration.ConfigurationManager.AppSettings["ClientId"];

        //// RedirectUri is the URL where the user will be redirected to after they sign in.
        //string redirectUri = System.Configuration.ConfigurationManager.AppSettings["RedirectUri"];

        //// Tenant is the tenant ID (e.g. contoso.onmicrosoft.com, or 'common' for multi-tenant)
        //static string tenant = System.Configuration.ConfigurationManager.AppSettings["Tenant"];

        //// Authority is the URL for authority, composed by Azure Active Directory v2.0 endpoint and the tenant name (e.g. https://login.microsoftonline.com/contoso.onmicrosoft.com/v2.0)
        //string authority = String.Format(System.Globalization.CultureInfo.InvariantCulture, System.Configuration.ConfigurationManager.AppSettings["Authority"], tenant);



        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
