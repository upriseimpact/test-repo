using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Uprise.Api.Domain.Identity;

namespace Uprise.Api.Domain
{
    public class Distributor
    {

        [Key]
        [DatabaseGenerated( DatabaseGeneratedOption.Identity )]
        public int Id { get; set; }

        [ForeignKey( "DistributorStatus" )]
        public int StatusId { get; set; }

        public int UserId { get; set; }

        public virtual DistributorStatus DistributorStatus { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; }
    }
}
