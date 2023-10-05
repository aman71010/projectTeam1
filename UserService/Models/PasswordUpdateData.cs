using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public class PasswordUpdateData
    {
        [Required]
        public string UserEmailId { get; set; }

        [Required, MinLength(6, ErrorMessage = "Password required atleast 6 characters.")]
        public string NewPassword { get; set; }
    }
}
