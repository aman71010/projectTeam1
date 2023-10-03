namespace PaymentService.Models
{
    public class OrderResponse
    {
        public string? razorpay_payment_Id { get; set; }
        public string? razorpay_signature { get; set; }
        public string? razorpay_orderId { get; set; }
    }
}

