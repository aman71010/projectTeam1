using Microsoft.EntityFrameworkCore;
using UserService.Models;

namespace UserService.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext context;

        public UserRepository(UserDbContext context)
        {
            this.context = context;
        }
        public void RegisterUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User LoginUser(string email, string password)
        {
            return context.Users.Where(u => u.UserEmailId.Equals(email) && u.Passowrd.Equals(password)).FirstOrDefault();
        }
    }
}
