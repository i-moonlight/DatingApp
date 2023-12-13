using DatingApp.DTOs;
using DatingApp.Entities;

namespace DatingApp.Services.Repository;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetByIdAsync(int id);
    Task<AppUser> GetUserByUsernameAsync(string username);
    Task<IEnumerable<MemberDto>> GetMemberAsync();
    Task<MemberDto> GetMemberAsync(string username);
}
