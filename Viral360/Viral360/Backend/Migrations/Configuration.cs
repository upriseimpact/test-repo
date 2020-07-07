namespace Uprise.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.Owin;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Web;

    internal sealed class Configuration : DbMigrationsConfiguration<Uprise.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "Uprise.Models.ApplicationDbContext";
        }

        protected override void Seed(Uprise.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            ////if (!context.Roles.Any(r => r.Name == "AppAdmin"))
            ////{
            ////    var store = new RoleStore<IdentityRole>(context);
            ////    var manager = new RoleManager<IdentityRole>(store);
            ////    var role = new IdentityRole { Name = "AppAdmin" };

            ////    manager.Create(role);
            ////}

            ////if (!context.Users.Any(u => u.UserName == "founder"))
            ////{
            ////    var store = new UserStore<ApplicationUser>(context);
            ////    var manager = new UserManager<ApplicationUser>(store);
            ////    var user = new ApplicationUser { UserName = "founder" };

            ////    manager.Create(user, "ChangeItAsap!");
            ////    manager.AddToRole(user.Id, "AppAdmin");
            ////}
            context.Industries.AddOrUpdate(
                industry => industry.Name,
                new Models.Industry { Name = "Fashion" },
                new Models.Industry { Name = "Food" },
                new Models.Industry { Name = "Health Care" },
                new Models.Industry { Name = "Insurance" },
                new Models.Industry { Name = "Travel" }
            );

            context.Tag.AddOrUpdate(
                tag => tag.TagName,
                new Models.Tag { TagName = "Fashion" },
                new Models.Tag { TagName = "Food" },
                new Models.Tag { TagName = "Health Care" },
                new Models.Tag { TagName = "Insurance" },
                new Models.Tag { TagName = "Travel" }
            );

            context.SocialMedias.AddOrUpdate(
                socialMedia => socialMedia.SocialMediaName,
                new Models.SocialMedia { SocialMediaName = "Facebook" },
                new Models.SocialMedia { SocialMediaName = "Google Plus" },
                new Models.SocialMedia { SocialMediaName = "Instagram" },
                new Models.SocialMedia { SocialMediaName = "LinkedIn" },
                new Models.SocialMedia { SocialMediaName = "Snapchat" }
            );

            context.DistributorStatus.AddOrUpdate(
                status => status.StatusName,
                new Models.DistributorStatus { StatusName = "Pending" },
                new Models.DistributorStatus { StatusName = "Active" },
                new Models.DistributorStatus { StatusName = "Inactive" }
            );

            context.Roles.AddOrUpdate(
                role => role.Name,
                new Models.CustomRole { Name = "Sharer"},
                new Models.CustomRole { Name = "Distributor"},
                new Models.CustomRole { Name = "Admin" }
            );
        }
    }
}
