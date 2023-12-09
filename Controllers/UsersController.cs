using DatingApp.Data;
using DatingApp.Entities;
using DatingApp.Services.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() => Ok(await _userRepository.GetUsersAsync());

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username) => await _userRepository.GetUserByUsernameAsync(username);
    }
}
