namespace SubscriptionService.Exceptions
{
    public class SubscriptionDoesNotExistException:Exception
    {
        public SubscriptionDoesNotExistException()
        {
            
        }
        public SubscriptionDoesNotExistException(string message) : base(message) 
        {

        }
    }
}
