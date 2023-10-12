using SubscriptionService.Model;
using SubscriptionService.Repository;
using SubscriptionService.Exceptions;

namespace SubscriptionService.Service
{
    public class SubscriptionServices : ISubscriptionServices
    {
        private readonly ISubscriptionRepository repo;
        public SubscriptionServices(ISubscriptionRepository repo)
        {
            this.repo = repo;
        }
        public void AddSubscription(Subscription subscription)
        {
            var res = repo.GetSubscription(subscription.UserId);
            if (res != null)
            {
                throw new SubscriptionAlreadyExistException($"Subscription with id {subscription.Id} already exist");
            }
            else
            {
                repo.AddSubscription(subscription);
            }
        }

        public void DeleteSubscription(string UserId)
        {
            var res = repo.GetSubscription(UserId);
            if (res != null)
            {
                repo.DeleteSubscription(UserId);
            }
            else
            {
                throw new SubscriptionDoesNotExistException($"Subscription with UserId {UserId} does not exist");
            }
        }

        public Subscription GetSubscription(string UserId)
        {
            var res = repo.GetSubscription(UserId);
            if (res != null)
            {
                return repo.GetSubscription(UserId);
            }
            else
            {
                throw new SubscriptionDoesNotExistException($"Trainee with UserId {UserId} does not exist");
            }
        }

        public List<Subscription> GetSubscriptions()
        {
            return repo.GetSubscriptions();
        }

        public void UpdateSubscription(string UserId, Subscription subscription)
        {
            var res = repo.GetSubscription(UserId);
            if (res != null)
            {
                repo.UpdateSubscription(UserId, subscription);
            }
            else
            {
                throw new SubscriptionDoesNotExistException($"Subscription with UserId {UserId} does not exists");
            }
        }
    }
}
