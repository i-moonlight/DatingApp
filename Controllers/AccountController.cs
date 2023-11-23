﻿using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext _dataContext;

        public AccountController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("register")] //POST: api/account/register
        public async Task<ActionResult<AppUser>>Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username))
            {
                return BadRequest("Username is taken");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();

            return user;
        }
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>>Login(LoginDto loginDto)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x =>
            x.UserName == loginDto.Username);
            
            if(user == null)
            {
                return Unauthorized("Invalid user");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(var i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return user;
        }
        private async Task<bool> UserExists(string username)
        {
            return await _dataContext.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
