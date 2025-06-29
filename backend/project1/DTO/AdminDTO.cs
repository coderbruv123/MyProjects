namespace project1.Models
{
    public class AdminDTO
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public Boolean Is_admin { get; set; } 

    }
}