using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Uprise.Enums;

namespace Uprise.Models
{
    public class ReturnedCampaign : SelectListItem
    {
        public int Id { get; set; }

        public string CampaignTitle { get; set; }

        public CampaignType CampaignType { get; set; }

        public string City { get; set; }

        public int DistributorId { get; set; }

        public Gender Gender { get; set; }

        public int IndustryId { get; set; }

        public string Message { get; set; }

        public int PostId { get; set; }

        public int SocialMediaId { get; set; }

        public ReturnedPost Post { get; set; }

    }
}