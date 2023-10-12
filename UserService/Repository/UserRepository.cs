using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
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
        public User CreateUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }

        public User GetUserByUserEmailId(string emailId)
        {
            return context.Users.Where(u => u.UserEmailId.Equals(emailId)).FirstOrDefault();
        }

        public void UpdateName(string userEmailId, string name)
        {
            User user = GetUserByUserEmailId(userEmailId);
            user.Name = name;
            context.SaveChanges();
        }

        public void UpdatePassword(string userEmailId, string password)
        {
            User user = GetUserByUserEmailId(userEmailId);
            user.Password = password;
            context.SaveChanges();
        }

        public void UpdateMobileNo(string userEmailId, long mobileNo)
        {
            User user = GetUserByUserEmailId(userEmailId);
            user.MobileNo = mobileNo;
            context.SaveChanges();
        }

        public void UpdateUserImage(string userEmailId, byte[] userImage)
        {
            User user = GetUserByUserEmailId(userEmailId);
            user.UserImage = userImage;
            context.SaveChanges();
        }

        public void UpdateAddress(string userEmailId, Address address)
        {
            User user = GetUserByUserEmailId(userEmailId);
            user.Address = address;
            context.SaveChanges();
        }
        Address IUserRepository.GetAddress(string userEmailId)
        {
            return context.UserAddresses.Where(a => a.UserEmailId.Equals(userEmailId)).OrderByDescending(a => a.AddressId).FirstOrDefault();
        }
    }
}
