using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project1.Data;
using project1.Models;
using project1.DTO;
using System.Security.Claims;

namespace project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {



        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }


        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategiory(CategoryDTO categorydto,HttpContext context)
        {

        var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim != null){
            return BadRequest("User not authenticated");
        }
            var category = new Category
            {
                Name = categorydto.Name
            };
            await _context.Categories.AddAsync(category);
            _context.SaveChanges();

            return Ok(category);

        }


    } }

