using System;
using Uprise.Api.Domain;

namespace Uprise.Api.Infrastructure.Helpers
{
    public static class SubscriptionStatusToString
    {
        public const string Active = "Active";
        public const string Inactive = "Inactive";
        public const string Pending = "Pending";

        public static string ConvertFromEnum( SubscriptionStatusValue subscriptionStatus )
        {
            switch ( subscriptionStatus )
            {
                case SubscriptionStatusValue.Pending:
                    return Pending;
                case SubscriptionStatusValue.Active:
                    return Active;
                case SubscriptionStatusValue.Inactive:
                    return Inactive;
                default:
                    throw new ArgumentOutOfRangeException( nameof( subscriptionStatus ) );
            }
        }
    }
}
