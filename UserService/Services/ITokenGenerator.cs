using UserService.Models;

namespace UserService.Services
{
    public interface ITokenGenerator
    {
        string GenerateToken(string email, Role role);
    }
}
