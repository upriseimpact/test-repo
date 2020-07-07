using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class CampaignEmailResponse
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Campaign")]
        public int CampaignId { get; set; }

        public Campaign Campaign { get; set; }

        [ForeignKey("Contact")]
        public int ContactId { get; set; }

        public Contact Contact { get; set; }

        [Column(TypeName ="Text")]
        public string Response { get; set; }
    }
}