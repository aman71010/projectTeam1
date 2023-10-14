using UserService.Models;
using UserService.Repository;
using UserService.Exceptions;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace UserService.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository userRepository;
        private readonly IConfiguration configuration;
        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            this.userRepository = userRepository;
            this.configuration = configuration;
        }

        public string Login(UserLogin user)
        {
            User currUser = userRepository.GetUserByUserEmailId(user.Email);
            if(currUser == null)
            {
                throw new UserNotFoundException("User not found!");
            }
            if(!currUser.Password.Equals(user.Password))
            {
                throw new PasswordNotMatchException("Wrong Password");
            }
            return GenerateToken(currUser);
        }

        private string GenerateToken(User user)
        {

            List<Claim> claims = new List<Claim> {
                new Claim("Name", user.Name),
                new Claim("UserEmailId", user.UserEmailId), 
                new Claim("UserRole", user.UserRole.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Jwt").GetSection("Secret").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration.GetSection("Jwt").GetSection("Issuer").Value,
                audience: configuration.GetSection("Jwt").GetSection("Audience").Value,
                claims: claims,
                signingCredentials: credentials,
                expires: DateTime.Now.AddMinutes(40)
            ) ;

            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiresIn = 40*60,
                userEmail = user.UserEmailId,
                role = user.UserRole.ToString()
            };

            return JsonConvert.SerializeObject(response);
        }
    }
}
