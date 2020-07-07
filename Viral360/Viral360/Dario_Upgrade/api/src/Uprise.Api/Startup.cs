using System;
using System.Collections.Generic;
using System.Reflection;

using Uprise.Api.Bootstrapping;
using Uprise.Api.Infrastructure.Errors;

using FluentValidation.AspNetCore;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Uprise.Api.Infrastructure.Configuration;

namespace Uprise.Api
{
    public class Startup
    {
        private static readonly string UpriseAllowSpecificOrigins = "_upriseAllowSpecificOrigins";


        public Startup( IConfiguration configuration )
        {
            Configuration = configuration;
            UpriseConfiguration = Configuration.Get<UpriseApiConfiguration>();
        }

        public IConfiguration Configuration { get; }
        public UpriseApiConfiguration UpriseConfiguration { get; set; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices( IServiceCollection services )
        {
            FluentValidation.ValidatorOptions.PropertyNameResolver = CamelCasePropertyNameResolver.ResolvePropertyName;

            services.AddMediatR( Assembly.GetExecutingAssembly() );
            services.AddTransient( typeof( IPipelineBehavior<,> ), typeof( ValidationPipelineBehavior<,> ) );

            Bootstrapper.ConfigureApplicationServices( services, UpriseConfiguration );

            services.AddControllers()
                 .AddFluentValidation
                (
                    cfg =>
                    {
                        cfg.RegisterValidatorsFromAssemblyContaining<Startup>();
                    }
                );

            services.AddSwaggerGen( x =>
            {
                //x.AddSecurityDefinition( "Bearer", new OpenApiSecurityScheme
                //{
                //    In = ParameterLocation.Header,
                //    Description = "Please insert JWT with Bearer into field",
                //    Name = "Authorization",
                //    Type = SecuritySchemeType.ApiKey,
                //    BearerFormat = "JWT"
                //} );

                //x.AddSecurityRequirement( new OpenApiSecurityRequirement()
                //{
                //    {   new OpenApiSecurityScheme
                //    {
                //        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                //    },
                //    new string[] {}}
                //} );
                x.SwaggerDoc( "v1", new OpenApiInfo { Title = "Uprise API", Version = "v1" } );
                x.CustomSchemaIds( y => y.FullName );
                x.DocInclusionPredicate( ( version, apiDescription ) => true );
                x.TagActionsBy( y => new List<string>()
                {
                    y.GroupName
                } );
            } );

            services.AddCors
            (
                options =>
                {
                    options.AddPolicy
                    (
                        UpriseAllowSpecificOrigins,
                        builder =>
                        {
                            builder
                                .SetIsOriginAllowed( isOriginAllowed: _ => true )
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                        }
                    );
                }
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IWebHostEnvironment env )
        {
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseRouting();

            //app.UseAuthorization();

            app.UseCors( UpriseAllowSpecificOrigins );

            app.UseEndpoints
            (
                endpoints =>
                {
                    endpoints.MapControllers();
                }
            );

            app.UseSwagger
            (
                c =>
                {
                    c.RouteTemplate = "swagger/{documentName}/swagger.json";
                }
            );

            // Enable middleware to serve swagger-ui assets(HTML, JS, CSS etc.)
            app.UseSwaggerUI
            ( x =>
                {
                    x.SwaggerEndpoint( "/swagger/v1/swagger.json", "Uprise API V1" );
                }
            );

            Bootstrapper.StartupRequiredServices( app.ApplicationServices );
        }
    }
}
