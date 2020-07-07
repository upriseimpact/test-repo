using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Uprise.Api.Domain;

namespace Uprise.Api.ViewModels
{
    public class ContactViewModel
    {
        public int Id { get; set; }

        [Required]
        [Display( Name = "Distributor" )]
        public int DistributorId { get; set; }

        public Platform? Platform { get; set; }

        [Required]
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

        public virtual Distributor Distributor { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }
    }
}
