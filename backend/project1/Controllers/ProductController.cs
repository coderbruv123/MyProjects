using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project1.Data;
using project1.DTO;
using project1.Models;
namespace project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(ApplicationDbContext context) : ControllerBase
    {

        private readonly ApplicationDbContext _context = context;



        [HttpGet]
     
        public async Task <ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public ActionResult <Product> GetProduct(int id)
        {
            var product = _context.Products.Find(id);
            if(product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
           [Authorize]
        public ActionResult <Product> CreateProduct (ProductDTO productdto)
        {

            var product = new Product
            {
                Name = productdto.Name,
                Price = productdto.Price,
                CategoryId = productdto.CategoryId,
                Quantity = productdto.Quantity

            };
            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok("Created");
        }

        [HttpDelete("{id}")]
           [Authorize]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if(product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateProduct(int id , Product upproduct)
        {

            if (id != upproduct.Id)
            {
                return BadRequest();
            }

            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            product.Name = upproduct.Name;
            product.Price = upproduct.Price;
            product.Quantity = upproduct.Quantity;

            _context.SaveChanges();
            return NoContent();
        }

    }
}
