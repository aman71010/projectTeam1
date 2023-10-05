using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MenuService.DataModel
{
    public class MenuItem
    {

        [BsonId]
        public string MenuItemId { get; set; }

        [StringLength(20,ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number.")]
        public int Price { get; set; }

        [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        [StringLength(20,ErrorMessage="category cannot exceed 20 character")]
        public string Category { get; set; }
        public byte[]? Image { get; set; }
    }
}
