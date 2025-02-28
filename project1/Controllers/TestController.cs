using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to the Api!");
        }
       
            
    }
}
