﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace project1.Models
{
    public class Product
    {
        public int Id { get; set; }

        public required string Name { get; set; }
        public decimal Price { get; set; }
        
        public int Quantity { set; get; }
        public string? ImagePath{ get; set; }

        //Foreign key
        public int CategoryId { get; set; }

        


        //Navigation property for Category
        [JsonIgnore]
        public Category Category { get; set; }    = null!;
    }
}
