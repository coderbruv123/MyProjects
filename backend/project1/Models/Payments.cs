namespace project1.Models
{
    public class Payments
    {
        public int Id { get; set; }
        public string? TransactionUuid{ get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string? PaymentMethod { get; set; } 

        public virtual Order? Order { get; set; }
    }
}