using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Uprise.Api.Domain
{
    public class CampaignContacts
    {
        [Key]
        [Column( Order = 0 )]
        [ForeignKey( "Campaign" )]
        [Display( Name = "Campaign" )]
        public int CampaignId { get; set; }

        public virtual Campaign Campaign { get; set; }

        [Key]
        [Column( Order = 1 )]
        [ForeignKey( "Contact" )]
        [Display( Name = "Contact" )]
        public int ContactId { get; set; }

        public virtual Contact Contact { get; set; }
    }
}
