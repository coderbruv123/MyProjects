using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project1.Data;
using project1.Models;

namespace project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("cart/{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _context.Carts.Include(c => c.CartItems)
                                            .ThenInclude(ci => ci.Product)
                                            .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                return NotFound("Cart not found");
            }
            return Ok(cart);
        }
        [HttpPost("cart/add")]
        public async Task<IActionResult> AddToCart()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }
            var cart = new Cart
            {
                UserId = int.Parse(userIdClaim.Value),
                CartItems = new List<CartItem>(),
                TotalPrice = 0

            };
            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCart), new { userId = cart.UserId }, cart);
        }
        

       
    }
 }