using project1.Models;

namespace project1.Services{
    public interface IAuthServices{
        Task<string> Register(UserDTO userDto);
        Task<string> RegisterAdmin(AdminDTO userDto);
        Task<string?> Login(UserDTO userDto);
    }
    
}