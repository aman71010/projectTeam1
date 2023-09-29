using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Models;
using UserService.Repository;
using UserService.Services;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenGenerator tokenGenerator;
        public UserController(IUserRepository userRepository, ITokenGenerator tokenGenerator)
        {
            this.userRepository = userRepository;
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost("register")]
        public IActionResult AddUser(User user)
        {
            userRepository.RegisterUser(user);
            return Created("api/user/register", user);
        }

        [HttpPost("login")]
        public IActionResult LoginUser(string email, string password, Role role)
        {
            User user = userRepository.LoginUser(email, password);
            if (user == null)
            {
                return Unauthorized();
            }
            return Ok(tokenGenerator.GenerateToken(email, role));
        }

    }
}
