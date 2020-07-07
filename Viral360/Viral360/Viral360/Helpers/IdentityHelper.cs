using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Client;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Web.Mvc;
using Uprise.Models;
using Uprise.Helpers;
using Uprise.Services;
using System.Configuration;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;

namespace Uprise.Helpers
{
    public static class IdentityHelper
    {
        //    if (IsNewUser(notification))
        //        {
        //            CreateLocalUser(notification);
        //}
        public static string GetUserOId(IPrincipal user)
        {
            if (IsNewUser(user))
            {
                CreateLocalUser(user);
            }
            var userClaims = user.Identity as System.Security.Claims.ClaimsIdentity;
            return userClaims?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        }

        public static bool IsNewUser(IPrincipal user)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();

            var userClaims = user.Identity as System.Security.Claims.ClaimsIdentity;
            var newUserClaim = userClaims?.FindFirst("newUser")?.Value;
            var email = userClaims?.FindFirst("emails")?.Value;
            var dbUser = userManager.FindByName(email);

            if ( dbUser == null ||(newUserClaim != null && newUserClaim.ToLower() == "true"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool TryGetDistributor(IPrincipal user, out Distributor distributor, out string errorMessage)
        {
            errorMessage = "Not authorized";
            distributor = null;
            var db = new ApplicationDbContext();

            try
            {

                var oid = IdentityHelper.GetUserOId(user);
                var localUser = db.Users.Where(u => u.OId == oid).FirstOrDefault();

                if (localUser == null)
                {
                    errorMessage = "Not associated to our database.";
                    return false;
                }

                distributor = db.Distributor.Find(localUser.Id);

                if (distributor == null)
                {
                    errorMessage = "The user does not have a Distributor role.";
                    return false;
                }

                if (!IsDistributor(user))
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                db.Dispose();
            }
        }

        public static bool IsDistributor(IPrincipal user)
        {
            var userClaims = user.Identity as System.Security.Claims.ClaimsIdentity;
            var subscriptionTypeClaim = userClaims?.FindFirst("extension_SubscriptionType")?.Value;

            if (subscriptionTypeClaim != null && subscriptionTypeClaim == SubscriptionTypeToString.Distributor)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static void CreateLocalUser(IPrincipal principal)
        {
            ApplicationDbContext db = new ApplicationDbContext();

            try
            {
                var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
                var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();

                var userClaims = principal.Identity as System.Security.Claims.ClaimsIdentity;
                var email = userClaims?.FindFirst("emails")?.Value;
                var oid = userClaims?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

                var user = userManager.FindByName(email);
                if (user == null)
                {
                    user = new ApplicationUser { UserName = email, Email = email };
                    user.OId = oid;
                    var result = userManager.Create(user);
                    result = userManager.SetLockoutEnabled(user.Id, false);
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
                    if (IsDistributor(principal))
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
    }
}