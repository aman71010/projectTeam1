using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.Models;

namespace UserService.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        public string GenerateToken(string email, Role role)
        {
            Claim[] claims = new Claim[] { new Claim(ClaimTypes.Email, email), new Claim("UserType", role.ToString()) };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this_is_my_secret_key"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "userservice",
                audience: "apigateway",
                claims: claims,
                signingCredentials: credentials,
                expires: DateTime.Now.AddMinutes(60)
            );

            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
            };

            return JsonConvert.SerializeObject(response);

        }
    }
}
