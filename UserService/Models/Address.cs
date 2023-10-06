using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserService.Models
{
    public class Address
    {
        public long AddressId { get; set; }
        public string HouseNo { get; set; }
        public string Landmark { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }

        [RegularExpression(@"^\d{6}$", ErrorMessage = "Pincode is not valid.")]
        public int Pincode { get; set; }

        [ForeignKey("User")]
        public string UserEmailId { get; set; }
        //public User User { get; set; }

    }
}
