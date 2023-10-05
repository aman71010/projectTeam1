using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentService.Models
{
    public class OrderEntity
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public double Amount { get; set; }
        [Key]
        public string? OrderId { get; set; }
    }
}
