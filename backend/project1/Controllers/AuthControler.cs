using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project1.Data;
using project1.Models;
using project1.Services;

namespace project1.Controllers{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthServices authService ) : ControllerBase
    {
      
        [HttpPost("register")]
        public IActionResult Register(UserDTO userDto )
        {
       


        
            
            if(userDto == null || string.IsNullOrEmpty(userDto.Name) || string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { message = "All fields are required" });
            }
            var user = authService.Register(userDto).Result;
            if(user != "User registered successfully")
            {
                return BadRequest(user);
            }
            return Ok(user);
        }

        [HttpPost("login")]
    
        public IActionResult Login(UserDTO userDto)
        {
            if (string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }
            
           

            
            var user = authService.Login(userDto).Result;
            if(user == null){
                return Unauthorized(new { message = "Invalid email or password" });
            }


            return Ok(user);
        }
       
    }
}