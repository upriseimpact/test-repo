using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class Distributor
    {

        [Key]
        public int Id { get; set; }

        [ForeignKey("DistributorStatus")]
        public int StatusId { get; set; }

        [ForeignKey("Id")]
        public virtual ApplicationUser UserId { get; set; }

        public virtual DistributorStatus DistributorStatus { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; }
    }
}