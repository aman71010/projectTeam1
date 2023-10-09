using MenuService.DataModel;
using MongoDB.Driver;
using System.Linq;
namespace MenuService.Repository
{
    public class MenuRepository : IMenuRepository
    {
        private readonly DataContext context;
        public MenuRepository(DataContext context)
        {
            this.context = context;
        }
        public void AddMenu(MenuItem menu)
        {
            context.menuItems.InsertOne(menu);
        }

        public void DeleteMenu(string id)
        {
            var filter = Builders<MenuItem>.Filter.Eq("MenuItemId", id);
            context.menuItems.DeleteOne(filter);

        }

        

        public List<MenuItem> GetAllMenuItem()
        {
            return context.menuItems.Find(m=>true).ToList();
           
        }

        public List<MenuItem> GetMenuByCategory(string category)
        {
            return context.menuItems.Find(m => m.Category.Equals(category)).ToList();
        }

        public MenuItem GetMenuByMenuItemId(string id)
        {
            return context.menuItems.Find(m => m.MenuItemId.Equals(id)).FirstOrDefault();
        }

        public void UpdateMenuById(string id, MenuItem menu)
        {
            var filter = Builders<MenuItem>.Filter.Where(m=>m.MenuItemId.Equals(id));
            var update = Builders<MenuItem>.Update
                .Set(m => m.Name, menu.Name)
                .Set(m => m.Price, menu.Price)
                .Set(m => m.Description, menu.Description)
                .Set(m => m.Category, menu.Category);
            context.menuItems.UpdateOne(filter, update);
        }

        public void UpdateMenuImage(string menuItemId, byte[] menuImage)
        {
            var filter = Builders<MenuItem>.Filter.Where(m => m.MenuItemId.Equals(menuItemId));
            var update = Builders<MenuItem>.Update.Set(m => m.Image, menuImage);
            context.menuItems.UpdateOne(filter, update);
        }
    }
}
