using DatingApp.Data;
using DatingApp.Extensions;
using DatingApp.Services.TokenService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();

//Configure the HTTP request pipeline.
app.UseCors(builder => builder.AllowAnyHeader()
                              .AllowAnyMethod()
                              .WithOrigins("http://localHost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
