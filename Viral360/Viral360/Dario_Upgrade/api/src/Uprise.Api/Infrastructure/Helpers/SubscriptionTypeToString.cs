using System;
using Uprise.Api.Domain;

namespace Uprise.Api.Infrastructure.Helpers
{
    public static class SubscriptionTypeToString
    {
        public const string Distributor = "Distributor";
        public const string Sharer = "Sharer";

        public static string ConvertFromEnum( SubscriptionType subscriptionType )
        {
            switch ( subscriptionType )
            {
                case SubscriptionType.Distributor:
                    return Distributor;
                case SubscriptionType.Sharer:
                    return Sharer;
                default:
                    throw new ArgumentOutOfRangeException( nameof( subscriptionType ) );
            }
        }
    }
}
