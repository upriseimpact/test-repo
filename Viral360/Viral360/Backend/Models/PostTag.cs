using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class PostTag
    {

        [Key]
        [Column(Order = 0)]
        [ForeignKey("Post")]
        [Display(Name = "Post")]
        public int PostId { get; set; }

        [Key]
        [Column(Order = 1)]
        [ForeignKey("Tag")]
        [Display(Name = "Tag")]
        public int TagId { get; set; }

        public virtual Post Post { get; set; }

        public virtual Tag Tag { get; set; }
    }
}