using System.ComponentModel.DataAnnotations;

namespace Uprise.Api.Domain.Identity
{
    public class ApplicationUser
    {
        //[Key]
        public int Id { get; set; }
        public string Oid { get; set; }

        public string Name { get; set; }
    }
//    public class ApplicationUser : IdentityUser<int, CustomUserLogin, CustomUserRole,
//    CustomUserClaim>
//    {

//        public DateTime CreatedAt { get; set; } = DateTime.Now;

//        public string OId { get; set; }

//        public async Task<ClaimsIdentity> GenerateUserIdentityAsync( UserManager<ApplicationUser, int> manager )
//        {
//            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
//            var userIdentity = await manager.CreateIdentityAsync( this, DefaultAuthenticationTypes.ApplicationCookie );
//            // Add custom user claims here
//            return userIdentity;
//        }
//    }

//    public class CustomUserRole : IdentityUserRole<int> { }
//    public class CustomUserClaim : IdentityUserClaim<int> { }
//    public class CustomUserLogin : IdentityUserLogin<int> { }

//    public class CustomRole : IdentityRole<int, CustomUserRole>
//    {
//        public CustomRole() { }
//        public CustomRole( string name ) { Name = name; }
//    }

//    public class CustomUserStore : UserStore<ApplicationUser, CustomRole, int,
//        CustomUserLogin, CustomUserRole, CustomUserClaim>
//    {
//        public CustomUserStore( ApplicationDbContext context )
//            : base( context )
//        {
//        }
//    }

//    public class CustomRoleStore : RoleStore<CustomRole, int, CustomUserRole>
//    {
//        public CustomRoleStore( ApplicationDbContext context )
//            : base( context )
//        {
//        }
//    }
}
