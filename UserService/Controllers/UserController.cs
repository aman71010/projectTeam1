using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Exceptions;
using UserService.Services;
using UserService.Models;
using System.Text.Json;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register(UserRegister user)
        {
            try
            {
                return StatusCode(201, userService.CreateUser(user));
            }
            catch (UserAlreadyExistException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("get/{userEmailId}")]
        public IActionResult GetByUserEmailId(string userEmailId)
        {
            try
            {
                return Ok(userService.GetUserByUserEmailId(userEmailId));
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update/name")]
        public IActionResult UpdateName(NameUpdateData req)
        {
            try
            {
                userService.UpdateName(req.UserEmailId, req.Name);
                return Ok(new { message = "Name updated successfully" });
            }
            catch(UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update/password")]
        public IActionResult UpdatePassword(PasswordUpdateData req)
        {
            try
            {
                userService.UpdatePassword(req.UserEmailId, req.NewPassword);
                return Ok("Password updated successfully");
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update/number")]
        public IActionResult UpdateMobileNo(MobileNoUpdateData req)
        {
            try
            {
                userService.UpdateMobileNo(req.UserEmailId, req.MobileNo);
                return Ok(new { message = "Number updated successfully" });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update/image")]
        public IActionResult AddOrUpdateUserImage([FromForm] string email, [FromForm] IFormFile Img)
        {
            try
            {
                FileModel fm = new FileModel();

                fm.UserEmailId = email;
                fm.FormFile = Img;

                using (MemoryStream mStream = new MemoryStream())
                {
                    fm.FormFile.CopyTo(mStream);
                    userService.UpdateUserImage(fm.UserEmailId, mStream.ToArray());
                }
                return Ok(new { message = "Image updated successfully" });
            }
            catch(UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update/Address")]
        public IActionResult UpdateAddress(Address req)
        {
            try
            {
                userService.UpdateAddress(req.UserEmailId, req);
                return Ok(new { message = "Address updated successfully" });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("get/address/{userEmailId}")]
        public IActionResult GetAddress(string userEmailId)
        {
            try
            {
                return Ok(userService.GetAddress(userEmailId));
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
