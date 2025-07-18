namespace YourProject.Models
{
    public class KhaltiInitiateRequest
    {
        public decimal Amount { get; set; }
        public string? OrderId { get; set; }
        public string? OrderName { get; set; }
    }
    public class KhaltiInitiateResponse
    {
        public string? pidx { get; set; }
        public string? payment_url { get; set; }
    }

    public class KhaltiVerifyRequest
    {
        public string? pidx { get; set; }
    }
    
        public class KhaltiVerifyResponse
    {
        public string status { get; set; }
        public string pidx { get; set; }
        public string total_amount { get; set; }
        public string transaction_id { get; set; }
        public string merchant_order_id { get; set; }
        public string mobile { get; set; }
    }

}
