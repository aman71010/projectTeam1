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

        public void DeleteSubscription(int id)
        {
            context.subscriptions.DeleteOne(t => t.Id == id);
        }

        public Subscription GetSubscription(int id)
        {
            return context.subscriptions.Find(t=>t.Id==id).FirstOrDefault();
        }

        public List<Subscription> GetSubscription()
        {
            return context.subscriptions.Find(t=>true).ToList();
        }

        public void UpdateSubscription(int id, Subscription subscription)
        {
            var filter = Builders<Subscription>.Filter.Where(t=> t.Id == id);
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
