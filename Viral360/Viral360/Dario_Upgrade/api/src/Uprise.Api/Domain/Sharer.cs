using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Uprise.Api.Domain
{
    public class Sharer
    {

        [Key, DatabaseGenerated( DatabaseGeneratedOption.None )]
        public int Id { get; set; }

        //[ForeignKey("Id")]
        //public virtual ApplicationUser UserId { get; set; }

        [Required]
        [StringLength( 100 )]
        [Display( Name = "First Name" )]
        public string FirstName { get; set; }

        [Required]
        [StringLength( 100 )]
        [Display( Name = "Last Name" )]
        public string LastName { get; set; }

    }
}
