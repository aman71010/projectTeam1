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
            //client = new MongoClient(Environment.GetEnvironmentVariable("Mongoclient"));
            database = client.GetDatabase(config.GetSection("DatabaseName").Value);
            //database = client.GetDatabase(Environment.GetEnvironmentVariable("Dbname3"));
        }
        public IMongoCollection<Subscription> subscriptions => database.GetCollection<Subscription>("subscriptionka");
    }
}
