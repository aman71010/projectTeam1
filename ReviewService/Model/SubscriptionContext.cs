using MongoDB.Driver;

namespace SubscriptionService.Model
{
    public class SubscriptionContext
    {
        MongoClient client;
        IMongoDatabase database;
        public SubscriptionContext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("MyMongodbCon"));
            database = client.GetDatabase(config.GetSection("DatabaseName").Value);
        }
        public IMongoCollection<Subscription> subscriptions => database.GetCollection<Subscription>("Karthiksub");
    }
}
