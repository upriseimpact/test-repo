using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Uprise.Api.ViewModels
{
    public class DistributorHomeViewModel
    {
        [Display( Name = "Distributor Name" )]
        public string FullName { get; set; }

        [Display( Name = "Campaigns" )]
        public IList<ReturnedCampaign> CampaignsList { get; set; }

        [Display( Name = "Posts" )]
        public IList<ReturnedPost> PostsList { get; set; }

        [Display( Name = "Contacts" )]
        public IList<ReturnedContact> ContactsList { get; set; }

    }
}
