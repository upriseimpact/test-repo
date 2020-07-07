using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

namespace Uprise.Api.Infrastructure.Errors
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private static JsonSerializerOptions SerializerOptions;


        static ErrorHandlingMiddleware()
        {
            SerializerOptions = new JsonSerializerOptions();
            SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        }

        public ErrorHandlingMiddleware( RequestDelegate next )
        {
            _next = next;
        }

        public async Task Invoke( HttpContext context )
        {
            try
            {
                await _next( context );
            }
            catch ( Exception e )
            {
                await HandleExceptionAsync( context, e );
            }
        }

        private static async Task HandleExceptionAsync( HttpContext context, Exception exception )
        {
            object errors = null;

            switch ( exception )
            {
                case RestException re:
                    errors = re.Errors;
                    context.Response.StatusCode = ( int ) re.Code;
                    break;
                case Exception e:
                    errors = string.IsNullOrWhiteSpace( e.Message ) ? "Error" : e.Message;
                    context.Response.StatusCode = ( int ) HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "application/json";

            var result = JsonSerializer.Serialize( new { errors }, SerializerOptions );

            await context.Response.WriteAsync( result );
        }
    }
}
