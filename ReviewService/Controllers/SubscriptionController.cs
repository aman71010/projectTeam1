using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SubscriptionService.Service;
using SubscriptionService.Model;
using SubscriptionService.Exceptions;


namespace SubscriptionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionServices svc;
        public SubscriptionController(ISubscriptionServices svc)
        {
            this.svc = svc;
            
        }

        [HttpPost]
        public IActionResult create(Subscription subscriptionobj)
        {
            try
            {
                svc.AddSubscription(subscriptionobj);
                return StatusCode(201, "Subscription Added");
            }
            catch(SubscriptionAlreadyExistException e) 
            {
                return Conflict(e.Message);
            }
            catch (Exception e) 
            {
                return StatusCode(500, e.Message);
            }

        }
        [HttpGet]
        public IActionResult list() 
        {
            return Ok(svc.GetSubscription());
        }

        [HttpGet("{id}")]
        public IActionResult get(int id) 
        {
            try
            {
                return Ok(svc.GetSubscription(id));
            }
            catch(SubscriptionDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpPut]
        public IActionResult update(int id, Subscription sobj)
        {
            try
            {
                svc.UpdateSubscription(id, sobj);
                return Ok("Subscription Updated");
            }
            catch(SubscriptionDoesNotExistException e)
            {
                return NotFound(e.Message); 
            }
        }
        [HttpDelete]
        public IActionResult delete(int id) 
        {
            try
            {
                svc.DeleteSubscription(id);
                return Ok("Subscription Deleted");
            }
            catch(SubscriptionDoesNotExistException e)
            {
                return NotFound(e.Message); 
            }
        }
    }
}
