using project1.Models;

namespace project1.Services{
    public interface IAuthServices{
        Task<string> Register(UserDTO userDto);
        Task<User> Login(UserDTO userDto);
    }
    
}