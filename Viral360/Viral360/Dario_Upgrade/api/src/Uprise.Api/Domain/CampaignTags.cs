using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Uprise.Api.Domain
{
    public class CampaignTags
    {
        [Key]
        [Column( Order = 0 )]
        [ForeignKey( "Campaign" )]
        [Display( Name = "Campaign" )]
        public int CampaignId { get; set; }

        [Key]
        [Column( Order = 1 )]
        [ForeignKey( "Tag" )]
        [Display( Name = "Tag" )]
        public int TagId { get; set; }

        public virtual Campaign Campaign { get; set; }

        public virtual Tag Tag { get; set; }
    }
}
