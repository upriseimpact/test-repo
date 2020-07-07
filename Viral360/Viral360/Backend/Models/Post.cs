using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Uprise.Enums;

namespace Uprise.Models
{
    public class Post
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Distributor")]
        public int DistributorId { get; set; }

        public virtual Distributor Distributor { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name = "Post Title")]
        public string PostTitle { get; set; }

        [Required]
        [Display(Name = "Post Message")]
        [StringLength(1000)]
        public string PostMessage { get; set; }

        [Required]
        public MediaType MediaType { get; set; }

        [Display(Name = "Media")]
        public string OriginalMediaLink { get; set; }

        public string ThumbnailLink { get; set; }



    }
}