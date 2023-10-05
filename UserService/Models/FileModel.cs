using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public class FileModel
    {
        [Required]
        public string UserEmailId { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
