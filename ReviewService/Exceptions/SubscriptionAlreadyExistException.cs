namespace SubscriptionService.Exceptions
{
    public class SubscriptionAlreadyExistException:Exception
    {
        public SubscriptionAlreadyExistException()
        {
            
        }

        public SubscriptionAlreadyExistException(string message):base(message)
        {

        }
    }
}
