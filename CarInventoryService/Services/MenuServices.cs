using MenuService.DataModel;
using MenuService.Exceptions;
using MenuService.Repository;

namespace MenuService.Services
{
    public class MenuServices : IMenuService
    {
        private readonly IMenuRepository repo;
        public MenuServices(IMenuRepository repo)
        {
            this.repo=repo;
        }
        public void AddMenu(MenuItem menu)
        {
            var res = repo.GetMenuByMenuItemId(menu.MenuItemId);
            if (res != null)
            {
                throw new MenuAlreadyExistException($"menu with specific id {menu.MenuItemId} exist");
            }
            else
            {
                repo.AddMenu(menu);
            }
        }

        public void DeleteMenu(string id)
        {
            var res = repo.GetMenuByMenuItemId(id);
            if (res != null)
            {
                repo.DeleteMenu(id);
            }
            else
            {
                throw new MenuDoesNotExistException($"menu with id {id} does not exist");
            }
        }

        public List<MenuItem> GetAllMenuItem()
        {
            return repo.GetAllMenuItem();
        }

        public MenuItem GetMenuByCategory(string category)
        {
            var res = repo.GetMenuByCategory(category);
            if (res != null)
            {
                return repo.GetMenuByCategory(category);
            }
            else
            {
                throw new MenuDoesNotExistException($"menu with id {category} does not exist");
            }
        }

        public MenuItem GetMenuByMenuItemId(string MenuItemId)
        {
            var res = repo.GetMenuByMenuItemId(MenuItemId);
            if (res != null)
            {
                return repo.GetMenuByMenuItemId(MenuItemId);
            }
            else
            {
                throw new MenuDoesNotExistException($"menu with id {MenuItemId} does not exist");
            }
        }

        public void UpdateMenuById(string id, MenuItem menu)
        {
            var res = repo.GetMenuByMenuItemId(id);
            if (res != null)
            {
                 repo.UpdateMenuById(id,menu);
            }
            else
            {
                throw new MenuDoesNotExistException($"menu with id {id} does not exist");
            }
        }
    }
}
