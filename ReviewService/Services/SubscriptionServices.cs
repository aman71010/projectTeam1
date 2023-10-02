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
            var res = repo.GetSubscription(subscription.Id);
            if(res != null)
            {
                throw new SubscriptionAlreadyExistException($"Subscription with id {subscription.Id} already exist");
            }
            else
            {
                repo.AddSubscription(subscription);
            }
        }

        public void DeleteSubscription(int id)
        {
            var res = repo.GetSubscription(id);
            if(res != null)
            {
                repo.DeleteSubscription(id);
            }
            else
            {
                throw new SubscriptionDoesNotExistException($"Subscription with id {id} does not exist");
            }
        }

        public Subscription GetSubscription(int id)
        {
            var res = repo.GetSubscription(id);
            if (res != null)
            {
                return repo.GetSubscription(id);
            }
            else
            {
                throw new SubscriptionDoesNotExistException($"Trainee with id {id} does not exist");
            }
        }

        public List<Subscription> GetSubscription()
        {
            return repo.GetSubscription();
        }

        public void UpdateSubscription(int id, Subscription subscription)
        {
            var res = repo.GetSubscription(id);
            if(res != null)
            {
                repo.UpdateSubscription(id, subscription);
            }
            else
            {
                throw new SubscriptionDoesNotExistException($"Subscription with id {id} does not exists");
            }
        }
    }
}
