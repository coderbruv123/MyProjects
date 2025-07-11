namespace project1.DTO{
    public class OrderDTO
    {
        public decimal TotalAmount { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();
        public string Status { get; set; } = null!;

        public string Location { get; set; } = null!; 
        public string PhoneNumber { get; set; } = null!;
        
    }
}