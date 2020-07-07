using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Uprise.Models
{
    public class Tag
    {

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name = "Tag Name")]
        public string TagName { get; set; }

        public virtual ICollection<PostTag> PostTags { get; set; }
    }
}