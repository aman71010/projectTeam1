using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public class MobileNoUpdateData
    {
        [Required]
        public string UserEmailId { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Please enter a 10-digit mobile number.")]
        public long MobileNo { get; set; }
    }
}
