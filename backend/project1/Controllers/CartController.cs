using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project1.Data;
using project1.DTO;
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


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCart()

        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }
            var userId = int.Parse(userIdClaim.Value);
            var carts = await _context.Carts
                       .Include(c => c.CartItems)
                       .ThenInclude(ci => ci.Product)
                      .Where(c => c.UserId == userId)
                    .ToListAsync();
            if (carts == null || carts.Count == 0)
            {
                return NotFound("Cart not found");
            }

            var cartDtos = carts.Select(cart => new CartResponseDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                TotalPrice = cart.TotalPrice,
                CartItems = cart.CartItems.Select(ci => new CartItemDto
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Price,
                    ProductName = ci.ProductName,
                    ImageUrl = ci.ImageUrl
                }).ToList()
            }).ToList();

            return Ok(cartDtos);
        }

        [Authorize]
        [HttpPost("cart/add")]
        public async Task<IActionResult> AddToCart()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }
            var carts = await _context.Carts
                .Where(c => c.UserId == int.Parse(userIdClaim.Value))
                .ToListAsync();
            if(carts.Count > 5)
            {
                return BadRequest("Cart  limit exceeded. You can only have 5 carts.");
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

        [Authorize]
        [HttpPost("cart/item/{id}")]
        public async Task<IActionResult> AddCartItem(int id, CartItemDto cartItemDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }
            var userId = int.Parse(userIdClaim.Value);
            var cart = await _context.Carts.Where(c => c.Id == id)
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == cartItemDto.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += cartItemDto.Quantity;
            }
            else
            {
                cart.CartItems.Add(new CartItem
                {
                    ImageUrl = cartItemDto.ImageUrl,
                    ProductId = cartItemDto.ProductId,
                    Quantity = cartItemDto.Quantity,
                    Price = cartItemDto.Price,
                    ProductName = cartItemDto.ProductName,


                });
            }

            cart.TotalPrice = cart.CartItems.Sum(ci => ci.Price * ci.Quantity);

            await _context.SaveChangesAsync();

            var cartDto = new CartResponseDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                TotalPrice = cart.TotalPrice,
                CartItems = cart.CartItems.Select(ci => new CartItemDto
                {
                    ImageUrl = ci.ImageUrl,
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Price,
                    ProductName = ci.ProductName
                }).ToList()
            };

            return Ok(cartDto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> ClearCart(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }
            var userId = int.Parse(userIdClaim.Value);
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
            if (cart == null)
            {
                return NotFound("Cart not found");
            }
            cart.CartItems.Clear();
            cart.TotalPrice = 0;
            await _context.SaveChangesAsync();
            return Ok("Cart cleared successfully");
        }

        [HttpDelete("{id}/{productid}")]
        
        [Authorize]
        public async Task<IActionResult> RemoveCartItem(int id, int productId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }
            var userId = int.Parse(userIdClaim.Value);

            var cart = await _context.Carts.Where(c => c.Id == id)
                   .Include(c => c.CartItems)
                   .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return BadRequest("Cart doesn't exist");
            }
            var cartItem = cart.CartItems.Find(ci => ci.ProductId == productId);

            if (cartItem == null)
            {
                return BadRequest("item doesn't exist in cart ");
            }
            else
            {
                                cart.TotalPrice -= cartItem.Price * cartItem.Quantity;

                cart.CartItems.Remove(cartItem);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}