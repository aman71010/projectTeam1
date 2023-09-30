using MongoDB.Driver;

namespace MenuService.DataModel
{
    public class DataContext
    {
        MongoClient client;
        IMongoDatabase database;
        public DataContext(IConfiguration config)
        {
            client = new MongoClient(config.GetConnectionString("MyMonGoDbCon"));
            database=client.GetDatabase(config.GetSection("DatabaseName").Value);
        }
       public IMongoCollection<MenuItem> menuItems => database.GetCollection<MenuItem>("menuItems");
    }
}
