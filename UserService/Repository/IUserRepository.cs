using UserService.Models;

namespace UserService.Repository
{
    public interface IUserRepository
    {
        void RegisterUser(User user);
        User LoginUser(string email, string password);
    }
}
