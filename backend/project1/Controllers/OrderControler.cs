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

            var orders = await _context.Orders.Where(o => o.UserId == int.Parse(userIdClaim.Value)).Include(o => o.OrderItems)

                .ToListAsync();

            var response = orders.Select(o => new Order
            {
                Id = o.Id,
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                PhoneNumber = o.PhoneNumber,
                Location = o.Location,
                OrderItems = o.OrderItems.Select(oi => new OrderItem
                {
                    Id = oi.Id,
                    ProductId = oi.ProductId,
                    ProductName = oi.ProductName,
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            }).ToList();

            return Ok(response);
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

    if (order == null || order.OrderItems == null || !order.OrderItems.Any())
    {
        return BadRequest("Order or Order items cannot be empty.");
    }

    var orderEntity = new Order
    {
        OrderDate = DateTime.UtcNow,
        TotalAmount = order.TotalAmount,
        Status = order.Status,
        UserId = int.Parse(userIdClaim.Value),
        PhoneNumber = order.PhoneNumber,
        Location = order.Location,
        OrderItems = order.OrderItems.Select(oi => new OrderItem
        {
            ProductId = oi.ProductId,
            ProductName = oi.ProductName,
            Quantity = oi.Quantity,
            Price = oi.Price
        }).ToList()
    };

    _context.Orders.Add(orderEntity);
    await _context.SaveChangesAsync();

    var orderResponse = new Order
    {
        Id = orderEntity.Id,
        OrderDate = orderEntity.OrderDate,
        TotalAmount = orderEntity.TotalAmount,
        Status = orderEntity.Status,
        PhoneNumber = orderEntity.PhoneNumber,
        Location = orderEntity.Location,
        OrderItems = orderEntity.OrderItems.Select(oi => new OrderItem
        {
            Id = oi.Id,
            ProductId = oi.ProductId,
            ProductName = oi.ProductName,
            Quantity = oi.Quantity,
            Price = oi.Price
        }).ToList()
    };

    return Ok(orderResponse);
}

    }
}