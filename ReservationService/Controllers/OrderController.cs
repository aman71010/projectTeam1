using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderService.Excecption;
using OrderService.Models;
using OrderService.Services;

namespace OrderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService svc;
        public OrderController(IOrderService svc)
        {
            this.svc = svc;
        }
        [HttpPost("CreateOrder")]
        public IActionResult create(Order orderobj)
        {
            try
            {
                svc.PlaceOrder(orderobj);
                return StatusCode(201, "Order Added");
            }
            catch (OrderAlreadyExistExcecption e)
            {
                return Conflict(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        

        [HttpDelete("deleteOrder/{id}")]
        public IActionResult delete(string id)
        {
            try
            {
                svc.CancelOrder(id);
                return Ok("Trainee deleted");
            }
            catch (OrderDoesNotExistExcecption e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpGet("getOrdersByEmail/{email}")]
        public IActionResult GetByEmail(string email)
        {
            try
            {
                var order = svc.GetOrdersByEmail(email);

               
                    return Ok(order); // Return the retrieved order
                
                
            }
            catch (OrderDoesNotExistExcecption e)
            {
                return NotFound(e.Message); // Order does not exist exception
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message); // Handle other exceptions (e.g., database connection issues)
            }
        }

        [HttpPut("updateOrder/{id}")]
        public IActionResult update(string id, Order oobj)
        {
            try
            {
                svc.UpdateOrder(id, oobj);
                return Ok("Successfuly Updated");
            }
            catch (OrderDoesNotExistExcecption e)
            {
                return NotFound(e.Message);
            }
        }

    }
}
