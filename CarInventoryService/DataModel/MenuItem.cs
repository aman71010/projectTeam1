using MongoDB.Bson.Serialization.Attributes;

namespace MenuService.DataModel
{
    public class MenuItem
    {

        [BsonId]
        public string MenuItemId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public byte[]? Image { get; set; }
    }
}
