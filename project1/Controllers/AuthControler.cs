using Microsoft.AspNetCore.Mvc;
using project1.Models;

namespace project1.Controllers{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register(UserDTO userDto)
        {
            if (string.IsNullOrEmpty(userDto.Name) || string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { message = "All fields are required" });
            }


            return Ok(new { message = "User registered successfully" });
        }
       
    }
}