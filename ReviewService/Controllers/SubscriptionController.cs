using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SubscriptionService.Service;
using SubscriptionService.Model;
using SubscriptionService.Exceptions;

namespace SubscriptionService.Controllers
{
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionServices svc;
        public SubscriptionController(ISubscriptionServices svc)
        {
            this.svc = svc;
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create(Subscription subscriptionobj)
        {
            try
            {
                svc.AddSubscription(subscriptionobj);
                return StatusCode(201, "Subscription Added");
            }
            catch (SubscriptionAlreadyExistException e)
            {
                return Conflict(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("subscription/list")]
        public IActionResult List()
        {
            return Ok(svc.GetSubscription());
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(svc.GetSubscription(id));
            }
            catch (SubscriptionDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut]
        [Route("update/{id}")]
        public IActionResult Update(int id, Subscription sobj)
        {
            try
            {
                svc.UpdateSubscription(id, sobj);
                return Ok("Subscription Updated");
            }
            catch (SubscriptionDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                svc.DeleteSubscription(id);
                return Ok("Subscription Deleted");
            }
            catch (SubscriptionDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
