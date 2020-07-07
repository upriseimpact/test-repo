using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class SocialMedia
    {

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name = "Social Media")]
        public string SocialMediaName { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}