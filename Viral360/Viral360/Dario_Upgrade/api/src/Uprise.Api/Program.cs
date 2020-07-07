using System;
using System.Linq;

using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Uprise.Api.Domain;

namespace Uprise.Api
{
    public class Program
    {
        public static void Main( string [ ] args )
        {
            var host = CreateHostBuilder( args ).Build();

            using ( var scope = host.Services.CreateScope() )
            {
                //3. Get the instance of BoardGamesDBContext in our services layer
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<UpriseContext>();

                //4. Call the DataGenerator to create sample data
                InitializeDatabase( services );
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder( string [ ] args ) =>
            Host.CreateDefaultBuilder( args )
                .ConfigureWebHostDefaults( webBuilder =>
                 {
                     webBuilder.UseStartup<Startup>();
                 } );


        public static void InitializeDatabase( IServiceProvider serviceProvider )
        {
            using
            (
                var context = new UpriseContext
                (
                    serviceProvider.GetRequiredService<DbContextOptions<UpriseContext>>() )
                )
            {
                if ( !context.Industries.Any() )
                {
                    context.Industries.AddRange
                    (
                        new Industry { Id = 1, Name = "Food" },
                        new Industry { Id = 2, Name = "Fashion" },
                        new Industry { Id = 3, Name = "Health care" },
                        new Industry { Id = 4, Name = "Insurance" },
                        new Industry { Id = 5, Name = "Travel" }
                    );
                }

                if ( !context.Tag.Any() )
                {
                    context.Tag.AddRange
                    (
                        new Tag { Id = 1, TagName = "Food" },
                        new Tag { Id = 2, TagName = "Fashion" },
                        new Tag { Id = 3, TagName = "Health care" },
                        new Tag { Id = 4, TagName = "Insurance" },
                        new Tag { Id = 5, TagName = "Travel" }
                    );
                }

                if ( !context.SocialMedias.Any() )
                {
                    context.SocialMedias.AddRange
                    (
                        new SocialMedia { Id = 1, SocialMediaName = "Facebook" },
                        new SocialMedia { Id = 2, SocialMediaName = "Google Plus" },
                        new SocialMedia { Id = 3, SocialMediaName = "Instagram" },
                        new SocialMedia { Id = 4, SocialMediaName = "LinkedIn" },
                        new SocialMedia { Id = 5, SocialMediaName = "Snapchat" }
                    );
                }

                if ( !context.DistributorStatus.Any() )
                {
                    context.DistributorStatus.AddRange
                    (
                        new DistributorStatus { Id = 1, StatusName = "Pending" },
                        new DistributorStatus { Id = 2, StatusName = "Active" },
                        new DistributorStatus { Id = 3, StatusName = "Inactive" }
                    );
                }
                context.SaveChanges();
            }
        }
    }
}
