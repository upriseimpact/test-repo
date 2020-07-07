using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Uprise.Enums
{
    public enum Platform
    {
        Facebook = 1,
        [Description("Google Plus")] GooglePlus = 2,
        Instagram = 3,
        LinkedIn = 4,
        Snapchat = 5,
        Tumbler = 6
    }
}