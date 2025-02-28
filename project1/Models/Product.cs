using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace project1.Models
{
    public class Product
    {
        public int Id { get; set; }

        public  string Name { get; set; }
        public decimal Price { get; set; }
        
        public int Quantity { set; get; }

        //Foreign key
        public int CategoryId { get; set; }


        //Navigation property for Category
        [JsonIgnore]
        public Category Category { get; set; }    
    }
}
