using System.ComponentModel.DataAnnotations;

namespace Uprise.Api.Domain
{
    public class Industry
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display( Name = "Name" )]
        public string Name { get; set; }
    }
}
