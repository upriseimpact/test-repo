using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Uprise.Enums;

namespace Uprise.Models
{
    public class Campaign
    {
        public Campaign()
        {
            this.Contacts = new HashSet<Contact>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Distributor")]
        [Display(Name = "Distributor")]
        public int DistributorId { get; set; }

        [Required]
        [Display(Name = "Campaign Title")]
        public string CampaignTitle { get; set; }

        [ForeignKey("SocialMedia")]
        [Display(Name = "Social Media")]
        public int SocialMediaId { get; set; }

        [ForeignKey("Industry")]
        [Display(Name = "Industry")]
        public int IndustryId { get; set; }

        [Display(Name = "City")]
        [StringLength(100)]
        public string City { get; set; }

        public Gender Gender { get; set; }

        [StringLength(1000)]
        public string Message { get; set; }

        [ForeignKey("Post")]
        [Display(Name = "Post")]
        public int PostId { get; set; }

        public CampaignType CampaignType { get; set; }

        public virtual Distributor Distributor { get; set; }

        public virtual SocialMedia SocialMedia { get; set; }

        public virtual Industry Industry { get; set; }

        public virtual Post Post { get; set; }

        public virtual ICollection<CampaignTags> CampaignTags { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; }

        public DateTime LaunchDate { get; set; }
    }
}