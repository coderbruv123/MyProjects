namespace project1.DTO
{
    public class CartResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new();
    }
}