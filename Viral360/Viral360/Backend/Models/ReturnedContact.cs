using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Uprise.Enums;

namespace Uprise.Models
{
    public class ReturnedContact : SelectListItem
    {
        public int Id { get; set; }

        public int? Age { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public int DistributorId { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public Gender? Gender { get; set; }

        public string LastName { get; set; }

        public string Province { get; set; }

        public Platform? Platform { get; set; }

    }
}