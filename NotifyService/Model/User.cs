
namespace NotifyService.Model
{
    public enum Role
    {
        Customer,
        Admin
    }
    public class User
    {
        public string UserEmailId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public long MobileNo { get; set; }
        public byte[]? UserImage { get; set; }
        public Address? Address { get; set; }
        public Role UserRole { get; set; } = Role.Customer;
    }
}
