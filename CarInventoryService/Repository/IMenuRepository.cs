using MenuService.DataModel;

namespace MenuService.Repository
{
    public interface IMenuRepository
    {
       
        List<MenuItem> GetAllMenuItem();
        void AddMenu(MenuItem menu);
        void UpdateMenuById(string id,MenuItem menu);
        void DeleteMenu(string id);
        List<MenuItem> GetMenuByCategory(string category);
        MenuItem GetMenuByMenuItemId(string MenuItemId );
        void UpdateMenuImage (string menuItemId, byte[] menuImage);

    }
}
