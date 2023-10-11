using MenuService.DataModel;
using MenuService.Exceptions;
using MenuService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewComponents;

namespace MenuService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService svc;
        public MenuController(IMenuService svc)
        {
            this.svc = svc;
        }
        [HttpPost("createMenu")]
        public IActionResult CreateMenu([FromForm] MenuData menuobj)
        {
            try
            {
                MenuItem menu = new MenuItem();
                menu.Name = menuobj.Name;
                menu.Description = menuobj.Description;
                menu.Price = menuobj.Price;
                menu.Category = menuobj.Category;

                using(MemoryStream ms = new MemoryStream())
                {
                    menuobj.Image.CopyTo(ms);
                    menu.Image = ms.ToArray();
                }
                svc.AddMenu(menu);
                return Created("", menu);
            }
            catch (MenuAlreadyExistException e)
            {
                return Conflict(e.Message);
            }
        }

        [HttpPut]
        [Route("update/image")]
        public IActionResult AddUpadeImage([FromForm] FileModel file)
        {
            try
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    file.FormFile.CopyTo(ms);
                    svc.UpdateMenuImage(file.MenuItemId, ms.ToArray());
                }
                return Ok("menu image updated sucessfully");
            }
            catch (MenuDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpGet]
        [Route("get/image/{menuitemid}")]

        public IActionResult GetMenuImage(string menuitemid)
        {
            try
            {
                return Ok(svc.GetMenuImage(menuitemid));
            }
            catch (MenuDoesNotExistException e)
            {
                return NotFound(e.Message);
            }

        }

        [HttpGet]
        [Route("get/menulist")]
        
        public IActionResult list()
        {
            return Ok(svc.GetAllMenuItem());
        }

        [HttpGet]
        [Route("get/menubyid/{id}")]

        public IActionResult MenuListById(string id)
        {
            try
            {
                return Ok(svc.GetMenuByMenuItemId(id));
            }
            catch (MenuDoesNotExistException e)
            {
                return NotFound(e.Message);
            }

        }
        [HttpGet]
        [Route("get/MenuByCate/{category}")]

        public IActionResult MenuListByCategory(string category)
        {
            try
            {
                return Ok(svc.GetMenuByCategory(category));
            }
            catch(MenuDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpPut]
        [Route("updateMenu")]
        public IActionResult UpdateMenu(string menuid, MenuItem menu)
        {
            try
            {
                svc.UpdateMenuById(menuid, menu);
                return Ok("updated sucessfully");
            }
            catch (MenuDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpDelete]
        [Route("DeleteMenu/{menuid}")]
        public IActionResult DeleteMenu(string menuid)
        {
            try
            {
                svc.DeleteMenu(menuid);
                return Ok("menu deleted");
            }
            catch(MenuDoesNotExistException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
