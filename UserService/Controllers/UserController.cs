using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Exceptions;
using UserService.Services;
using UserService.Models;

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

        [HttpGet]
        [Route("get")]
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

        [HttpPatch]
        [Route("update/name")]
        public IActionResult UpdateName(NameUpdateData req)
        {
            try
            {
                userService.UpdateName(req.UserEmailId, req.Name);
                return Ok("Name updated successfully");
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

        [HttpPatch]
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

        [HttpPatch]
        [Route("update/number")]
        public IActionResult UpdateMobileNo(MobileNoUpdateData req)
        {
            try
            {
                userService.UpdateMobileNo(req.UserEmailId, req.MobileNo);
                return Ok("Number updated successfully");
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
        public IActionResult AddOrUpdateUserImage([FromForm] FileModel file)
        {
            try
            {
                using (MemoryStream mStream = new MemoryStream())
                {
                    file.FormFile.CopyTo(mStream);
                    userService.UpdateUserImage(file.UserEmailId, mStream.ToArray());
                }
                return Ok("UserImage updated successfully");
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

        [HttpGet]
        [Route("get/image")]
        public IActionResult GetUserImage(string userEmailId)
        {
            try
            {
                return Ok(userService.GetUserImage(userEmailId));
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
        [Route("get/address")]
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

        [HttpPut]
        [Route("update/Address")]
        public IActionResult UpdateAddress(Address req)
        {
            try
            {
                userService.UpdateAddress(req.UserEmailId, req);
                return Ok("Address updated successfully");
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
        [Route("get/all")]
        public IActionResult GetAllUsers()
        {
            return Ok(userService.GetAllUsers());
        }
    }
}
