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
        public IActionResult CreateOrder([FromBody] OrderDetails order)
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

            string key = "rzp_test_iARZQBAeCv7SSG";
            string secret = "MzX9NkPCtK9Iwy9GqvEegEkG";

            RazorpayClient client = new RazorpayClient(key, secret);

            Razorpay.Api.Order razorpayOrder = client.Order.Create(input);

            string orderId = razorpayOrder["id"].ToString();

            return Ok(new { OrderId = orderId });
        }
        [HttpPost("checkout")]

        public IActionResult Checkout([FromBody] OrderRequest checkout)
        {
            if (checkout == null)
            {
                return BadRequest("Invalid payment data.");
            }

            string key = "rzp_test_iARZQBAeCv7SSG";
            string secret = "MzX9NkPCtK9Iwy9GqvEegEkG";

            RazorpayClient client = new RazorpayClient(key, secret);

            return Ok(checkout);

        }

        [HttpPost("payment")]
        public IActionResult Payment([FromBody] OrderResponse orderResponse)
        {
            if (orderResponse == null)
            {
                return BadRequest("Invalid payment request.");
            }
            
            string key = "rzp_test_iARZQBAeCv7SSG";
            string secret = "MzX9NkPCtK9Iwy9GqvEegEkG";
            RazorpayClient client = new RazorpayClient(key, secret);

            Dictionary<string, string> attributes = new Dictionary<string, string>();

            attributes.Add("razorpay_payment_id", orderResponse.razorpay_payment_Id);
            attributes.Add("razorpay_order_id", orderResponse.razorpay_orderId);
            attributes.Add("razorpay_signature", orderResponse.razorpay_signature);

            Utils.verifyPaymentSignature(attributes);

            OrderDetails orderDetails = new OrderDetails
            {

                OrderId = orderResponse.razorpay_orderId
            };

            return Ok(new { Message = "Payment successfully Completed.", OrderDetails = orderDetails });
        }
    }
}
    
