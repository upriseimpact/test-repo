using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Uprise.Models
{
    public class EmailMessage
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Industry")]
        [Display(Name = "Industry")]
        public int IndustryId { get; set; }

        [Display(Name = "Default Message")]
        [StringLength(1000)]
        public string DefaultMessage { get; set; }

        public virtual Industry Industry { get; set; }
    }
}