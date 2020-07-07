using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Uprise.Helpers
{
    public static class ErrorHelper
    {
        public static string GetModelStateErrorMessages(ModelStateDictionary modelState)
        {
            return string.Join("; ", modelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
        }

        public static string GetExceptionMessages(this Exception exception, string message)
        {
            if (exception == null) return string.Empty;
            if (message == "") message = exception.Message;
            if (exception.InnerException != null)
                message += "\r\nInnerException: " + GetExceptionMessages(exception.InnerException, message);
            return message;
        }
    }
}