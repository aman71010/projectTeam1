using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Models;
using Razorpay.Api;

namespace PaymentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpPost("CreateOrder")]
        public IActionResult CreateOrder([FromBody] OrderEntity order)
        {
            if (order == null)
            {
                return BadRequest("Invalid order data.");
            }


            Dictionary<string, object> input = new Dictionary<string, object>
            {
                { "amount", Convert.ToDecimal(order.Amount) * 100 },
                { "currency", "INR" },
                {"receipt", "12121"}
            };

            string key = "rzp_test_pmZ9sPkab2DGdZ";
            string secret = "X3Pg0Jusi6Oo7bGABdZU69wE";

            RazorpayClient client = new RazorpayClient(key, secret);

            Razorpay.Api.Order razorpayOrder = client.Order.Create(input);

            string orderId = razorpayOrder["id"].ToString();

            OrderEntity responseOrder = new OrderEntity
            {
                OrderId = orderId,
                Amount = order.Amount,
                Email = order.Email,
                PhoneNumber = order.PhoneNumber,
            };

            return Ok(responseOrder);
        }
        [HttpPost("checkout")]

        public IActionResult Checkout([FromBody] OrderRequest checkout)
        {
            if (checkout == null)
            {
                return BadRequest("Invalid payment data.");
            }

            string key = "rzp_test_pmZ9sPkab2DGdZ";
            string secret = "X3Pg0Jusi6Oo7bGABdZU69wE";

            RazorpayClient client = new RazorpayClient(key, secret);

            return Ok(checkout);

        }

        [HttpPost("payment")]
        public IActionResult Payment([FromBody] OrderResponse paymentData)
        {
            if (paymentData == null)
            {
                return BadRequest("Invalid payment data.");
            }

            Dictionary<string, string> attributes = new Dictionary<string, string>();

            attributes.Add("razorpay_payment_id", paymentData.razorpay_payment_Id);
            attributes.Add("razorpay_order_id", paymentData.razorpay_orderId);
            attributes.Add("razorpay_signature", paymentData.razorpay_signature);

            Utils.verifyPaymentSignature(attributes);

            string key = "rzp_test_pmZ9sPkab2DGdZ";
            string secret = "X3Pg0Jusi6Oo7bGABdZU69wE";
            RazorpayClient client = new RazorpayClient(key, secret);

            OrderEntity orderDetails = new OrderEntity
            {

                OrderId = paymentData.razorpay_orderId
            };

            return Ok(new { Message = "Payment successful.", OrderDetails = orderDetails });
        }

        private bool VerifyPaymentSignature(OrderResponse paymentData)
        {
            string secretKey = "X3Pg0Jusi6Oo7bGABdZU69wE";

            string dataToSign = paymentData.razorpay_payment_Id + "|" + paymentData.razorpay_orderId;

            using (var hmac = new System.Security.Cryptography.HMACSHA256(System.Text.Encoding.UTF8.GetBytes(secretKey)))
            {
                byte[] hashBytes = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(dataToSign));


                string calculatedSignature = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();


                return calculatedSignature == paymentData.razorpay_signature;

            }
        }
    }
}
    
