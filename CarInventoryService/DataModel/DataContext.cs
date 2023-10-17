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
            //client = new MongoClient(Environment.GetEnvironmentVariable("Mongoclient"));
            database=client.GetDatabase(config.GetSection("DatabaseName").Value);
            //database = client.GetDatabase(Environment.GetEnvironmentVariable("Dbname"));
        }
       public IMongoCollection<MenuItem> menuItems => database.GetCollection<MenuItem>("menuItems");
    }
}
