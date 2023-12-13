using DatingApp.Data;
using DatingApp.Data.Migrations;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace DatingApp.Entities;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync())
        {
            return;
        }

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

        users.ForEach(user =>
        {
            using var hmach = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmach.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmach.Key;

            context.Users.Add(user);
        });

        await context.SaveChangesAsync();

    }
}
