using MenuService.DataModel;
using MenuService.Exceptions;
using MenuService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MenuService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService svc;
        public MenuController(IMenuService svc)
        {
            this.svc= svc;
        }
        [HttpPost]
        public IActionResult CreateMenu(MenuItem menuobj)
        {
            try
            {
                svc.AddMenu(menuobj);
                return StatusCode(201,"Menu Added");
            }
            catch(MenuAlreadyExistException e)
            {
                return Conflict(e.Message);
            }
        }

    }
}
