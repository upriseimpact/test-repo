using Uprise.Api.Domain.Identity;

namespace Uprise.Api.Infrastructure
{
    public static class Constants
    {
        public static ApplicationUser TestUser = new ApplicationUser
        {
            Id = 1,
            Name = "Uprise Test User",
            Oid = "BDA2AF6C-65AF-4F45-AE49-1A294D5BC189"
        };
    }
}
