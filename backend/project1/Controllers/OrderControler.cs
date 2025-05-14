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

    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
                        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }

            var orders = await _context.Orders.Where(o => o.UserId == int.Parse(userIdClaim.Value))
                .ToListAsync();
            return Ok(orders);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO order)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return BadRequest("User not authenticated");
            }

            if (order == null)
            {
                return BadRequest("Order cannot be null");
            }

            var order1 = new Order
            {
                OrderDate = DateTime.Now,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                UserId = int.Parse(userIdClaim.Value)
            };

            await _context.Orders.AddAsync(order1);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrders), new { id = order1.Id }, order1);
        }
    }
}