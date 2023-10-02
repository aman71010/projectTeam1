using System.Xml.Linq;
using UserService.Exceptions;
using UserService.Models;
using UserService.Repository;

namespace UserService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public void CreateUser(User user)
        {
            User u = userRepository.GetUserByUserEmailId(user.UserEmailId);
            if (u == null) 
            {
                userRepository.CreateUser(user);
            }
            else
            {
                throw new UserAlreadyExistException($"User with Email {user.UserEmailId} already exist");
            }
        }

        public Address GetAddress(string userEmailId)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                return userRepository.GetAddress(userEmailId);
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public List<User> GetAllUsers()
        {
            return userRepository.GetAllUsers();
        }

        public User GetUserByUserEmailId(string userEmailId)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                return user;
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public void UpdateAddress(string userEmailId, Address address) // check again
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                userRepository.UpdateAddress(userEmailId, address);
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public void UpdateMobileNo(string userEmailId, long mobileNo)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                userRepository.UpdateMobileNo(userEmailId, mobileNo);
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public void UpdateName(string userEmailId, string name)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                userRepository.UpdateName(userEmailId, name);
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public void UpdatePassword(string userEmailId, string password)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                userRepository.UpdatePassword(userEmailId, password);
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public void UpdateUserImage(string userEmailId, byte[] userImage)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                userRepository.UpdateUserImage(userEmailId, userImage);
            }
            else
            {
                throw new UserNotFoundException($"User with Email {userEmailId} not found");
            }
        }

        public string GetUserImage(string userEmailId)
        {
            User user = userRepository.GetUserByUserEmailId(userEmailId);
            if (user != null)
            {
                if(user.UserImage != null)
                {
                    string imageBase64Data = Convert.ToBase64String(user.UserImage);
                    string imageDataUrl = string.Format("data:image/jpg;base64,{0}", imageBase64Data);
                    return imageDataUrl;
                }
                else
                {
                    throw new Exception("User image not found. Add user image.");
                }
            }
            else
            {
                throw new UserNotFoundException("User not Found!");
            }
            
        }
    }
}
