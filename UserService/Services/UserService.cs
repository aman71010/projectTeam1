using Confluent.Kafka;
using Newtonsoft.Json;
using System.Xml.Linq;
using UserService.Exceptions;
using UserService.Models;
using UserService.Repository;

namespace UserService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IConfiguration configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            this.userRepository = userRepository;
            this.configuration = configuration;
        }
        public User CreateUser(UserRegister user)
        {

            User u = userRepository.GetUserByUserEmailId(user.Email);
            if (u != null)
            {
                throw new UserAlreadyExistException("User already exists");
            }
            else
            {
                User newUser = new User()
                {
                    UserEmailId = user.Email,
                    Name = user.Name,
                    Password = user.Password,
                    MobileNo = user.MobileNo
                };

                if(newUser.UserEmailId.Equals(configuration["Admin:email"]) && newUser.Password.Equals(configuration["Admin:password"])){
                    newUser.UserRole = Role.Admin;
                } 

                ProduceMessage(newUser.UserEmailId);

                return userRepository.CreateUser(newUser);
            }
                
        }

        public async Task ProduceMessage(string email)
        {
            //string message = JsonConvert.SerializeObject(email);
            string message = email;

            ProducerConfig pconfig = new ProducerConfig
            {
                BootstrapServers = configuration["Kafka:Server"]
            };

            using (var producer = new ProducerBuilder<Null, string>(pconfig).Build())
            {
                var result = await producer.ProduceAsync("UserTopic", new Message<Null, string>
                {
                    Value = message
                });
            }

            return;
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

        public void UpdateAddress(string userEmailId, Address address)
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

    }
}
