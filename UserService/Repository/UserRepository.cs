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
        public void CreateUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User GetUserByUserEmailId(string emailId)
        {
            return context.Users.Where(u => u.UserEmailId.Equals(emailId)).FirstOrDefault();
        }

        public List<User> GetAllUsers()
        {
            return context.Users.ToList();
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
            //user.Address.AddressId = address.AddressId;
            //user.Address.HouseNo = address.HouseNo;
            //user.Address.Landmark = address.Landmark;
            //user.Address.City = address.City;
            //user.Address.State = address.State;
            //user.Address.Country = address.Country;
            //user.Address.Pincode = address.Pincode;
            context.SaveChanges();
        }
        Address IUserRepository.GetAddress(string userEmailId)
        {
            return context.UserAddresses.Where(a => a.UserEmailId.Equals(userEmailId)).FirstOrDefault();
        }
    }
}
