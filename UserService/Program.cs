using Microsoft.EntityFrameworkCore;
using UserService.Models;
using UserService.Repository;
using UserService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("sqlServerConString")));
//builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(Environment.GetEnvironmentVariable("Sql_db")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService.Services.UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddCors(option => option.AddPolicy("userService", policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(option=>
{
    option.AddPolicy("mypolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("userService");

app.UseHttpsRedirection();
app.UseCors("mypolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
