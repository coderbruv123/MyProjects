namespace project1.DTO
{

   public class CartItemDto
        {
        public int ProductId { get; set; }
                public string? ImageUrl { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public required string ProductName { get; set; }
        }
}