using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class DistributorStatus
    {

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name = "Status Name")]
        public string StatusName { get; set; }

        public virtual ICollection<Distributor> Distributors { get; set; }
    }
}