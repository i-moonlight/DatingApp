using DatingApp.Data;
using DatingApp.Entities;
using DatingApp.Extensions;
using DatingApp.Middleware;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
//Configure the HTTP request pipeline.
app.UseCors(builder => builder.AllowAnyHeader()
                              .AllowAnyMethod()
                              .WithOrigins("http://localHost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
    var context = service.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = service.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occureed during migration");
}

app.Run();
