using System.ComponentModel;

namespace Uprise.Api.Domain
{
    public enum Platform
    {
        Facebook = 1,
        [Description( "Google Plus" )] GooglePlus = 2,
        Instagram = 3,
        LinkedIn = 4,
        Snapchat = 5,
        Tumbler = 6
    }
}
