namespace DTO
{
    public class OrderStatusDto
    {
  
        public string? TransactionUuid { get; set; }
        public string? Transaction_code { get; set; }
        public string? Status { get; set; }

        public decimal TotalAmount { get; set; }
        public string? ProductCode { get; set; }
    }


}


