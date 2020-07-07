using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Uprise.Api.Domain
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }

        [Required]
        //[Index( "IX_UniqueEmailDistributor", 1, IsUnique = true )]
        [ForeignKey( "Distributor" )]
        [Display( Name = "Distributor" )]
        public int DistributorId { get; set; }

        public Platform? Platform { get; set; }

        [Required]
        //[Index( "IX_UniqueEmailDistributor", 2, IsUnique = true )]
        [MaxLength( 100 )]
        public string Email { get; set; }

        [Display( Name = "First Name" )]
        public string FirstName { get; set; }

        [Display( Name = "Last Name" )]
        public string LastName { get; set; }

        public int? Age { get; set; }

        public string Country { get; set; }

        public string Province { get; set; }

        public string City { get; set; }

        public Gender? Gender { get; set; }

        [JsonIgnore]
        public virtual Distributor Distributor { get; set; }

        [JsonIgnore]
        [NotMapped] // TODO
        public virtual ICollection<Campaign> Campaigns { get; set; }

    }
}
