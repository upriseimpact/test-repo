﻿using System.ComponentModel.DataAnnotations;
using Uprise.Api.Domain;

namespace Uprise.Api.ViewModels
{
    public class PostViewModel
    {
        public int Id { get; set; }

        [Required]
        public int DistributorId { get; set; }

        public virtual Distributor Distributor { get; set; }

        [Required]
        [StringLength( 100 )]
        [Display( Name = "Post Title" )]
        public string PostTitle { get; set; }

        [Display( Name = "Post Message" )]
        [StringLength( 1000 )]
        public string PostMessage { get; set; }

        public MediaType MediaType { get; set; }

        public string OriginalMediaLink { get; set; }

        public string ThumbnailLink { get; set; }
    }
}
