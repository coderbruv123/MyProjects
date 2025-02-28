namespace project1.DTO
{
    public class ProductDTO
    {

        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { set; get; }


        //Foreign key
        public int CategoryId { get; set; }



    }
}
