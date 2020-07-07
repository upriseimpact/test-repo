using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Uprise.Api.Domain
{
    public class CampaignEmailResponse
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey( "Campaign" )]
        public int CampaignId { get; set; }

        public virtual Campaign Campaign { get; set; }

        [ForeignKey( "Contact" )]
        public int ContactId { get; set; }

        public virtual Contact Contact { get; set; }

        [Column( TypeName = "Text" )]
        public string Response { get; set; }
    }
}
