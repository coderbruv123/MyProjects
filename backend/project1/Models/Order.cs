using System.Text.Json.Serialization;

namespace project1.Models{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = null!;


        
        [JsonIgnore]
        public User User { get; set; } = null!;
    }
}