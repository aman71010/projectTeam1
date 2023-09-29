using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public enum Role
    {
        Customer,
        Admin
    }
    public class User
    {
        [Key]
        public string UserEmailId { get; set; }
        public string Name { get; set; }
        public string Passowrd { get; set; }
        public long MobileNo { get; set; }
        public byte[]? UserImage { get; set; }
        public Address? Address { get; set; }
        public Role? UserType { get; set; }
    }
}
