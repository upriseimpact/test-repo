using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Uprise.Api.Domain
{
    public class SocialMedia
    {

        public int Id { get; set; }

        [Required]
        [StringLength( 100 )]
        [Display( Name = "Social Media" )]
        public string SocialMediaName { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
