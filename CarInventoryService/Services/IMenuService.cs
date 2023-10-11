using MenuService.DataModel;

namespace MenuService.Services
{
    public interface IMenuService
    {
        List<MenuItem> GetAllMenuItem();
        void AddMenu(MenuItem menu);
        void UpdateMenuById(string id, MenuItem menu);
        void DeleteMenu(string id);
        List<MenuItem> GetMenuByCategory(string category);
        MenuItem GetMenuByMenuItemId(string MenuItemId);
        void UpdateMenuImage(string menuitemid, byte[] menuimage);
        string GetMenuImage(string menuItemId);
    }
}
