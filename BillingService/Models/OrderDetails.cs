using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentService.Models
{
    public class OrderDetails
    {
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public double Amount { get; set; }
        [NotMapped]
        public string OrderId { get; set; }
    }
}
