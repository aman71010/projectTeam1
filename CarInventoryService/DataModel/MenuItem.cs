using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MenuService.DataModel
{
    public class MenuItem
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? MenuItemId { get; set; }

        [Required(ErrorMessage ="Name is required")]
        [StringLength(20,ErrorMessage = "Name cannot exceed 20 characters")]  
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number.")]
        public double Price { get; set; }

        [StringLength(800, ErrorMessage = "Description cannot exceed 800 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        [StringLength(20,ErrorMessage="category cannot exceed 20 character")]
        public string Category { get; set; }
        public byte[]? Image { get; set; }
    }
}
