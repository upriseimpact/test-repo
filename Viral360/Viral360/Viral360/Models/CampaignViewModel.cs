using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Uprise.Enums;

namespace Uprise.Models
{
    public class CampaignViewModel
    {

        public int Id { get; set; }

        public int DistributorId { get; set; }

        [Required]
        [Display(Name = "Campaign Title")]
        public string CampaignTitle { get; set; }

        public int SocialMediaId { get; set; }

        public int IndustryId { get; set; }

        [StringLength(100)]
        public string City { get; set; }

        public Gender Gender { get; set; }

        [StringLength(1000)]
        public string Message { get; set; }

        public CampaignType CampaignType { get; set; }

        public virtual ICollection<CampaignTags> CampaignTags { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; }

        public DateTime LaunchDate { get; set; }
    }
}