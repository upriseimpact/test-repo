using System;
using Uprise.Api.Infrastructure.UserManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Uprise.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Uprise.Api.Infrastructure.Services;
using Uprise.Api.Infrastructure.Configuration;
using Uprise.Api.Infrastructure.Repositories;
using Uprise.Api.Infrastructure.Helpers;

namespace Uprise.Api.Bootstrapping
{
    public static class Bootstrapper
    {
        public static void ConfigureApplicationServices( IServiceCollection services, UpriseApiConfiguration configuration )
        {
            services.AddSingleton( configuration );

            services.AddDbContext<UpriseContext>
            (
                options => options
                    .UseLazyLoadingProxies()
                    .UseInMemoryDatabase( databaseName: "Uprise" )
            );

            services.AddScoped<ICurrentUserAccessor, CurrentUserAccessor>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton( x => new AzureBlobService( configuration.Azure.ConnectionString ) );

            services.AddScoped<CampaignRepository>();
            services.AddScoped<ContactRepository>();
            services.AddScoped<PostRepository>();

            services.AddScoped<UsersService>();
            services.AddScoped<IdentityHelper>();

            services.AddScoped<SendgridService>();
        }


        public static void StartupRequiredServices( IServiceProvider serviceProvider )
        {
        }
    }
}
