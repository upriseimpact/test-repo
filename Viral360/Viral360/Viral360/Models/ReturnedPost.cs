using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Uprise.Enums;

namespace Uprise.Models
{
    public class ReturnedPost : SelectListItem
    {
        public int Id { get; set; }

        public int DistributorId { get; set; }

        public MediaType MediaType { get; set; }

        public string PostMessage { get; set; }

        public string PostTitle { get; set; }

        public string OriginalMediaLink { get; set; }

        public string ThumbnailLink { get; set; }
    }
}