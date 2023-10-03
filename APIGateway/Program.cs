using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("apiGateway.json");
builder.Services.AddOcelot();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt").GetSection("Secret").Value));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer("token", options => options.TokenValidationParameters = new TokenValidationParameters()
{
    ValidateIssuer = true,
    ValidIssuer = builder.Configuration.GetSection("Jwt").GetSection("Issuer").Value,
    ValidateAudience = true,
    ValidAudience = builder.Configuration.GetSection("Jwt").GetSection("Audience").Value,
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = key
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseOcelot();

app.MapControllers();

app.Run();
