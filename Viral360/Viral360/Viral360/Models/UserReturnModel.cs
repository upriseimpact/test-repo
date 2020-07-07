using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class UserReturnModel
    {
        public string Url { get; set; }

        public int Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public bool EmailConfirmed { get; set; }

        public int Level { get; set; }

        public DateTime JoinDate { get; set; }

        public IList<string> Roles { get; set; }

        public DistributorHomeViewModel Distributor { get; set; }

        public Sharer Sharer { get; set; }

        public virtual string PhoneNumber { get; set; }

        public virtual bool PhoneNumberConfirmed { get; set; }

        public virtual bool TwoFactorEnabled { get; set; }

        public virtual DateTime? LockoutEndDateUtc { get; set; }

        public virtual bool LockoutEnabled { get; set; }

        public virtual int AccessFailedCount { get; set; }

        public SignInStatus SigninStatus { get; set; }

        public IList<CustomUserClaim> Claims { get; set; }
    }
}