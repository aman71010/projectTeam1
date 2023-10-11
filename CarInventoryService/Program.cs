using MenuService.DataModel;
using MenuService.Repository;
using MenuService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DataContext>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IMenuService,MenuServices>();

builder.Services.AddCors(option => option.AddPolicy("menuService", policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("menuService");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
