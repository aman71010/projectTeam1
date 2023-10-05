using UserService.Models;

namespace UserService.Services
{
    public interface IAuthService
    {
        string Login(UserLogin user);
    }
}
