using DatingApp.Entities;

namespace DatingApp.Services.TokenService
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
