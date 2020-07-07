using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Uprise.Enums;
namespace Uprise.Models
{
    public class ClientSideContact
    {
        public int DistributorId { get; set; }

        public Platform Platform { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public Gender Gender { get; set; }

        public int Age { get; set; }
    }
}