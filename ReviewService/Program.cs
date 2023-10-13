using SubscriptionService.Model;
using SubscriptionService.Repository;
using SubscriptionService.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<SubscriptionContext>();
builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();
builder.Services.AddScoped<ISubscriptionServices, SubscriptionServices>();

builder.Services.AddCors(op => op.AddPolicy("Mysubscription", plcy => plcy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Mysubscription");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
