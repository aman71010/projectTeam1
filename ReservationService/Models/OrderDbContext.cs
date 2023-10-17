using MongoDB.Driver;
namespace OrderService.Models
{
    public class OrderDbContext
    {
        MongoClient client;
        IMongoDatabase database;
      public OrderDbContext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("MyMongoCon"));
            //client = new MongoClient(Environment.GetEnvironmentVariable("Mongoclient"));
            database = client.GetDatabase(config.GetValue<string>("DatabaseName"));
            //database = client.GetDatabase(Environment.GetEnvironmentVariable("Dbname2"));
        }
       public IMongoCollection<Order> orders => database.GetCollection<Order>("orders");
    }
}
