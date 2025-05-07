using System.Text.RegularExpressions;
using project1.Models;
using Microsoft.EntityFrameworkCore;
using project1.Data;

namespace project1.Services
{
    public class AuthService(ApplicationDbContext _context) : IAuthServices
    {


        public async Task<string> Register(UserDTO userDto)
        {
            // Validate input
            if (string.IsNullOrEmpty(userDto.Name) || string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                return "All fields are required";
            }

            const string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (!Regex.IsMatch(userDto.Email, emailPattern))
            {
                return "Invalid email format";
            }

            if (userDto.Password.Length < 6)
            {
                return "Password must be at least 6 characters long";
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (existingUser != null)
            {
                return "Email already in use";
            }


            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully";
        }

        public Task<User> Login(UserDTO userDto)
        {
            throw new NotImplementedException("Login method not implemented yet.");
        }
    }
}