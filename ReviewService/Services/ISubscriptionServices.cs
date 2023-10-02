using SubscriptionService.Model;

namespace SubscriptionService.Service
{
    public interface ISubscriptionServices
    {
        Subscription GetSubscription(int id);
        List<Subscription> GetSubscription();
        void AddSubscription(Subscription subscription);
        void UpdateSubscription(int id, Subscription subscription);
        void DeleteSubscription(int id);
    }
}
