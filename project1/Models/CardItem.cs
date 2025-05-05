namespace project1.Models
{
    public class CardItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public int CartId { get; set; }
        public int Quantity { get; set; }
    }
}