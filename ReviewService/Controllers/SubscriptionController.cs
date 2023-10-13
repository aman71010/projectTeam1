using Microsoft.AspNetCore.Mvc;
using SubscriptionService.Exceptions;
using SubscriptionService.Model;
using SubscriptionService.Service;

[ApiController]
[Route("api/subscription")]
public class SubscriptionController : ControllerBase
{
    private readonly ISubscriptionServices svc;

    public SubscriptionController(ISubscriptionServices svc)
    {
        this.svc = svc;
    }

    [HttpPost]
    [Route("Create")]
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
    [Route("List")]
    public IActionResult list()
    {
        return Ok(svc.GetSubscriptions());
    }

    [HttpGet]
    [Route("get/{userId}")]
    public IActionResult Get(string userId)
    {
        string decodedUserId = Uri.UnescapeDataString(userId);
        try
        {
            return Ok(svc.GetSubscription(userId));
        }
        catch (SubscriptionDoesNotExistException e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpPut]
    [Route("update/{userId}")]
    public IActionResult Update(string userId, Subscription sobj)
    {
        try
        {
            svc.UpdateSubscription(userId, sobj);
            return Ok("Subscription Updated");
        }
        catch (SubscriptionDoesNotExistException e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpDelete]
    [Route("delete/{userId}")]
    public IActionResult Delete(string userId)
    {
        try
        {
            svc.DeleteSubscription(userId);
            return Ok("Subscription Deleted");
        }
        catch (SubscriptionDoesNotExistException e)
        {
            return NotFound(e.Message);
        }
    }
}
