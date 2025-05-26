namespace project1.DTO
{
    public class ProductDTO
    {

        public required string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { set; get; }


        //Foreign key
        public int CategoryId { get; set; }
        public IFormFile? Image { get; set; }



    }
}
