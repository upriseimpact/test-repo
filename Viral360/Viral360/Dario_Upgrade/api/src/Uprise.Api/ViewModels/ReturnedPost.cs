using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Uprise.Api.Domain;

namespace Uprise.Api.ViewModels
{
    public class ReturnedPost
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
