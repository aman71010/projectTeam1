using SubscriptionService.Model;

namespace SubscriptionService.Service
{
    public interface ISubscriptionServices
    {
        Subscription GetSubscription(string UserId);
        List<Subscription> GetSubscriptions();
        void AddSubscription(Subscription subscription);
        void UpdateSubscription(string UserId, Subscription subscription);
        void DeleteSubscription(string UserId);
    }
}
