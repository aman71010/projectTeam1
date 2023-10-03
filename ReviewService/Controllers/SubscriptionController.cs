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
<<<<<<< HEAD
        [Route("CreateSubscription")]
=======
        [Route("create")]
>>>>>>> ca69044928775b5f88cfeb5fe74c23aec834d58b
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
<<<<<<< HEAD
        [Route("getSubscriptionList")]
=======
        [Route("subscription/list")]
>>>>>>> ca69044928775b5f88cfeb5fe74c23aec834d58b
        public IActionResult List()
        {
            return Ok(svc.GetSubscription());
        }

        [HttpGet]
<<<<<<< HEAD
        [Route("getSubscriptionById/{id}")]
=======
        [Route("get/{id}")]
>>>>>>> ca69044928775b5f88cfeb5fe74c23aec834d58b
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
<<<<<<< HEAD
        [Route("updateSubscription/{id}")]
=======
        [Route("update/{id}")]
>>>>>>> ca69044928775b5f88cfeb5fe74c23aec834d58b
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
<<<<<<< HEAD
        [Route("deleteSubscription/{id}")]
=======
        [Route("delete/{id}")]
>>>>>>> ca69044928775b5f88cfeb5fe74c23aec834d58b
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
