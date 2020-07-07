using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Uprise.Api.Domain
{
    public class PostTag
    {

        [Key]
        [Column( Order = 0 )]
        [ForeignKey( "Post" )]
        [Display( Name = "Post" )]
        public int PostId { get; set; }

        [Key]
        [Column( Order = 1 )]
        [ForeignKey( "Tag" )]
        [Display( Name = "Tag" )]
        public int TagId { get; set; }

        public virtual Post Post { get; set; }

        public virtual Tag Tag { get; set; }
    }
}
