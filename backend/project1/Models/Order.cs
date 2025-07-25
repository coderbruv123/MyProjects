using System.Text.Json.Serialization;

namespace project1.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string TransactionUuid { get; set; } = null!; 

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = null!;

        public string Location { get; set; } = null!; 
        public string PhoneNumber { get; set; } = null!;

        [JsonIgnore]
        public User User { get; set; } = null!;
    }
}
