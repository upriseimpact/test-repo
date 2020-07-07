using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Uprise.Api.Domain
{
    public class DistributorStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength( 100 )]
        [Display( Name = "Status Name" )]
        public string StatusName { get; set; }

        [JsonIgnore]
        [InverseProperty("DistributorStatus")]
        public virtual ICollection<Distributor> Distributors { get; set; }
    }
}
