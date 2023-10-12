using MongoDB.Driver;
using SubscriptionService.Model;
using System.Linq;

namespace SubscriptionService.Repository
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly SubscriptionContext context;
        public SubscriptionRepository(SubscriptionContext context)
        {
            this.context = context;
        }
        public void AddSubscription(Subscription subscription)
        {
            context.subscriptions.InsertOne(subscription);
        }

        public void DeleteSubscription(string UserId)
        {
            context.subscriptions.DeleteOne(t => t.UserId == UserId);
        }

        public Subscription GetSubscription(string UserId)
        {
            return context.subscriptions.Find(t => t.UserId == UserId).FirstOrDefault();
        }

        public List<Subscription> GetSubscriptions()
        {
            return context.subscriptions.Find(t => true).ToList();
        }

        public void UpdateSubscription(string UserId, Subscription subscription)
        {
            var filter = Builders<Subscription>.Filter.Where(t => t.UserId == UserId);
            var update = Builders<Subscription>.Update.Set(t => t.UserId, subscription.UserId)
                .Set(t => t.Type, subscription.Type)
                .Set(t => t.StartDate, subscription.StartDate)
                .Set(t => t.EndDate, subscription.EndDate)
                .Set(t => t.Status, subscription.Status)
                .Set(t => t.CreatedAt, subscription.CreatedAt)
                .Set(t => t.UpdatedAt, subscription.UpdatedAt);

            context.subscriptions.UpdateOne(filter, update);
        }
    }
}
