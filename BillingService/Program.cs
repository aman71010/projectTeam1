using Microsoft.EntityFrameworkCore;
using PaymentService.Context;

var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
builder.Services.AddDbContext<PayDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Myconnection")));
//builder.Services.AddDbContext<PayDbContext>(options => options.UseSqlServer(Environment.GetEnvironmentVariable("Sql_db")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(option => option.AddPolicy("paymentService", policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("paymentService");
app.UseAuthorization();

app.MapControllers();

app.Run();