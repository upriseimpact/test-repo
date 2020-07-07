using System;
using System.Net;

namespace Uprise.Api.Infrastructure.Errors
{
    public class RestException : Exception
    {
        public object Errors { get; set; }
        public HttpStatusCode Code { get; }


        public RestException( HttpStatusCode code, object errors = null )
        {
            Code = code;
            Errors = errors;
        }
    }
}
