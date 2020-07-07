using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Uprise.Enums
{
    public enum CampaignType
    {
        Live = 1,
        Test = 2,
        [Description("Not Set")] NotSet = 3
    }
}