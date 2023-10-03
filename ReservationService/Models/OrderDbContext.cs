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
            database = client.GetDatabase(config.GetValue<string>("DatabaseName"));
        }
       public IMongoCollection<Order> orders => database.GetCollection<Order>("orders");
    }
}
