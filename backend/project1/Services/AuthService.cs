using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using project1.Data;
using project1.Models;

namespace project1.Services
{
    public class AuthService(ApplicationDbContext _context) : IAuthServices
    {


        public async Task<string> Register(UserDTO userDto)
        {
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
                        var hashPassword = new PasswordHasher<User>().HashPassword(user, userDto.Password);
            user.Password = hashPassword;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully";
        }

       public async Task<string?> Login(UserDTO userDto)
    {
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
    if (user == null)
    {
        return null;
    }

    var passwordVerificationResult = new PasswordHasher<User>().VerifyHashedPassword(user, user.Password, userDto.Password);
    if (passwordVerificationResult == PasswordVerificationResult.Failed)
    {
        return null;
    }
    return GenerateToken(user);

    }

        
    

    private string GenerateToken(User user){
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email) 
        };
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("your_secret_key_here_our_secret_key_here_our_secret_key_here"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: "issuer",
            audience: "Audience",
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);

    
    }   
}}