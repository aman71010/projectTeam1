using SubscriptionService.Model;

namespace SubscriptionService.Repository
{
    public interface ISubscriptionRepository
    {
        Subscription GetSubscription(int id);
        List<Subscription> GetSubscription();
        void AddSubscription(Subscription subscription);
        void UpdateSubscription(int id, Subscription subscription);
        void DeleteSubscription(int id);
    }
}
