using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public class UserRegister
    {
        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Please enter a 10-digit mobile number.")]
        public long MobileNo { get; set; }

        [Required, MinLength(6, ErrorMessage = "Password required atleast 6 characters.")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Password and Confirm password does not match.")]
        public string ConfirmPassword { get; set; }
    }
}
