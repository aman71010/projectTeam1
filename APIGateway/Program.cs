using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
builder.Configuration.AddJsonFile("Ocelot.json");
builder.Services.AddOcelot();

app.UseOcelot();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
