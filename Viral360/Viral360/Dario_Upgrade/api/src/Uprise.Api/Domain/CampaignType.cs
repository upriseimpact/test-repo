using System.ComponentModel;

namespace Uprise.Api.Domain
{
    public enum CampaignType
    {
        Live = 1,
        Test = 2,
        [Description( "Not Set" )] NotSet = 3
    }
}
