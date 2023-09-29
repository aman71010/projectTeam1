using MenuService.DataModel;

namespace MenuService.Repository
{
    public interface IMenuRepository
    {
       
        List<MenuItem> GetAllMenuItem();

        void AddMenu(MenuItem menu);
        void UpdateMenuById(string id,MenuItem menu);
        void DeleteMenu(string id);
        MenuItem GetMenuByCategory(string category);
        MenuItem GetMenuByMenuItemId(string MenuItemId );

    }
}
