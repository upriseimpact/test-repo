using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Notifications;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System;
using System.Configuration;
using System.IdentityModel.Claims;
using System.Threading.Tasks;
using System.Web;
using Uprise.Models;
using System.Net;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using Uprise.Helpers;

namespace Uprise
{
    public partial class Startup
    {
        // App config settings
        public static string ClientId = ConfigurationManager.AppSettings["ida:ClientId"];
        public static string ClientSecret = ConfigurationManager.AppSettings["ida:ClientSecret"];
        public static string AadInstance = ConfigurationManager.AppSettings["ida:AadInstance"];
        public static string Tenant = ConfigurationManager.AppSettings["ida:Tenant"];
        public static string RedirectUri = ConfigurationManager.AppSettings["ida:RedirectUri"];

        // B2C policy identifiers
        public static string SignUpSignInPolicyId = ConfigurationManager.AppSettings["ida:SignUpSignInPolicyId"];
        public static string EditProfilePolicyId = ConfigurationManager.AppSettings["ida:EditProfilePolicyId"];
        public static string ResetPasswordPolicyId = ConfigurationManager.AppSettings["ida:ResetPasswordPolicyId"];

        public static string DefaultPolicy = SignUpSignInPolicyId;

        // API Scopes
        public static string ApiIdentifier = ConfigurationManager.AppSettings["api:ApiIdentifier"];
        public static string ReadTasksScope = ApiIdentifier + ConfigurationManager.AppSettings["api:ReadScope"];
        public static string WriteTasksScope = ApiIdentifier + ConfigurationManager.AppSettings["api:WriteScope"];
        public static string[] Scopes = new string[] { ReadTasksScope};

        // OWIN auth middleware constants
        public const string ObjectIdElement = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

        // Authorities
        public static string Authority = String.Format(AadInstance, DefaultPolicy);

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);

            // Required for Azure webapps, as by default they force TLS 1.2 and this project attempts 1.0
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());

            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters()
            {
                //accept only those tokens where the audience of the token is equal to the Client Id of our application
                ValidAudience = ClientId,
                AuthenticationType = Startup.DefaultPolicy
            };

            app.UseOAuthBearerAuthentication(new Microsoft.Owin.Security.OAuth.OAuthBearerAuthenticationOptions
            {
                //This SecurityTokenProvider fetches the Azure B2C metadat & signing keys from the OpenIdConnect metadata endpoint
                AccessTokenFormat = new JwtFormat(tokenValidationParameters, new OpenIdConnectCachingSecurityTokenProvider(String.Format(AadInstance, DefaultPolicy)))
            });

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {
                    // Generate the metadata address using the tenant and policy information
                    MetadataAddress = String.Format(AadInstance, DefaultPolicy),

                    // These are standard OpenID Connect parameters, with values pulled from web.config
                    ClientId = ClientId,
                    RedirectUri = RedirectUri,
                    PostLogoutRedirectUri = RedirectUri,

                    // Specify the callbacks for each type of notifications
                    Notifications = new OpenIdConnectAuthenticationNotifications
                    {
                        RedirectToIdentityProvider = OnRedirectToIdentityProvider,
                        AuthorizationCodeReceived = OnAuthorizationCodeReceived,
                        AuthenticationFailed = OnAuthenticationFailed,
                    },

                    // Specify the claim type that specifies the Name property.
                    TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "name"
                    },

                    // Specify the scope by appending all of the scopes requested into one string (separated by a blank space)
                    Scope = $"openid profile offline_access {ReadTasksScope} {WriteTasksScope}"
                }
            );

            app.UseGoogleAuthentication(
                clientId: "665439904381-ch300ok5gkguasrepbsmhedqtvar9pid.apps.googleusercontent.com",
                clientSecret: "elqN3RyzaMW_t1HCf8NEIiLy");
            app.UseTwitterAuthentication(
               consumerKey: "k9gyghMppr8ZP8LdtGq52Rrc7",
               consumerSecret: "00LeqeHjDrRFmHZ2ng58lHngw0NiL6N5zIq5J311kBnR3NwkH8");

            app.UseFacebookAuthentication(
               appId: "367058920444574",
               appSecret: "59d28886fa88bf136f68d91c23dacaa2");

            app.Use(async (Context, next) =>
            {
                await next.Invoke();
            });
        }

        /*
         *  On each call to Azure AD B2C, check if a policy (e.g. the profile edit or password reset policy) has been specified in the OWIN context.
         *  If so, use that policy when making the call. Also, don't request a code (since it won't be needed).
         */
        private Task OnRedirectToIdentityProvider(RedirectToIdentityProviderNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> notification)
        {
            var policy = notification.OwinContext.Get<string>("Policy");

            if (!string.IsNullOrEmpty(policy) && !policy.Equals(DefaultPolicy))
            {
                notification.ProtocolMessage.Scope = OpenIdConnectScope.OpenId;
                notification.ProtocolMessage.ResponseType = OpenIdConnectResponseType.IdToken;
                notification.ProtocolMessage.IssuerAddress = notification.ProtocolMessage.IssuerAddress.ToLower().Replace(DefaultPolicy.ToLower(), policy.ToLower());
            }

            return Task.FromResult(0);
        }

        /*
        * Callback function when an authorization code is received 
        */
        private async Task OnAuthorizationCodeReceived(AuthorizationCodeReceivedNotification notification)
        {
            // Extract the code from the response notification
            var code = notification.Code;

            string signedInUserID = notification.AuthenticationTicket.Identity.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (IsNewUser(notification))
            {
                CreateLocalUser(notification);
            }

            //TokenCache userTokenCache = new MSALSessionCache(signedInUserID, notification.OwinContext.Environment["System.Web.HttpContextBase"] as HttpContextBase).GetMsalCacheInstance();
            //ConfidentialClientApplication cca = new ConfidentialClientApplication(ClientId, Authority, RedirectUri, new ClientCredential(ClientSecret), userTokenCache, null);
            //try
            //{
            //    AuthenticationResult result = await cca.AcquireTokenByAuthorizationCodeAsync(code, Scopes);
            //}
            //catch (Exception ex)
            //{
            //    //TODO: Handle
            //    throw;
            //}
        }

        //Create User=Admin@Admin.com with password=Admin@123456 in the Admin role        
        public void CreateLocalUser(AuthorizationCodeReceivedNotification notification)
        {
            ApplicationDbContext db = new ApplicationDbContext();

            try
            {
                var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
                var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();

                var email = notification.AuthenticationTicket.Identity.FindFirst("emails").Value;
                var oid = notification.AuthenticationTicket.Identity.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
                var user = userManager.FindByName(email);
                if (user == null)
                {
                    user = new ApplicationUser { UserName = email, Email = email };
                    user.OId = oid;
                    var result = userManager.Create(user);
                    result = userManager.SetLockoutEnabled(user.Id, false);
                    var userClaims = notification.AuthenticationTicket.Identity.Claims;
                    //foreach (var claim in userClaims)
                    //{
                    //    user.Claims.Add(
                    //        new CustomUserClaim
                    //        {
                    //            ClaimType = claim.Type,
                    //            ClaimValue = claim.Value
                    //        });
                    //}
                    //db.Users.Add(user);
                    if (IsDistributor(userClaims))
                    {
                        var distributor = new Distributor
                        {
                            Id = user.Id,
                            StatusId = (int)Enums.SubscriptionStatusValue.Active
                        };
                        db.Distributor.Add(distributor);
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                db.SaveChanges();
                db.Dispose();
            }
        }

        private bool IsNewUser(AuthorizationCodeReceivedNotification notification)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var email = notification.AuthenticationTicket.Identity.FindFirst("emails").Value;
            var user = userManager.FindByName(email);
            var newUserClaim = notification.AuthenticationTicket.Identity.FindFirst("newUser");
            if (user == null || (newUserClaim != null && newUserClaim.Value.ToLower() == "true"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool IsDistributor(IEnumerable<System.Security.Claims.Claim> userClaims)
        {
            foreach (var claim in userClaims)
            {
                if (claim.Type == "extension_SubscriptionType" && claim.Value == SubscriptionTypeToString.Distributor)
                {
                    return true;
                }
            }
            return false;
        }

        /*
         * Catch any failures received by the authentication middleware and handle appropriately
         */
        private Task OnAuthenticationFailed(AuthenticationFailedNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> notification)
        {
            notification.HandleResponse();

            // Handle the error code that Azure AD B2C throws when trying to reset a password from the login page 
            // because password reset is not supported by a "sign-up or sign-in policy"
            if (notification.ProtocolMessage.ErrorDescription != null && notification.ProtocolMessage.ErrorDescription.Contains("AADB2C90118"))
            {
                // If the user clicked the reset password link, redirect to the reset password route
                notification.Response.Redirect("/Account/ResetPassword");
            }
            else if (notification.Exception.Message == "access_denied")
            {
                notification.Response.Redirect("/");
            }
            else
            {
                notification.Response.Redirect("/Home/Error?message=" + notification.Exception.Message);
            }

            return Task.FromResult(0);
        }
    }
}