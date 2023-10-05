using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public class NameUpdateData
    {
        [Required]
        public string UserEmailId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}