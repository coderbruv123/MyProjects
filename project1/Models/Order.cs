namespace project1.Models
{
    public class Order
    {
       public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } = "Pending";
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = "Pending";
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    }
}