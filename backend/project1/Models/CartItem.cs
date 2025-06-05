namespace project1.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ImageUrl { get; set; }
        
        
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public required string ProductName { get; set; }

        public virtual Cart Cart { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;

        
    }
}