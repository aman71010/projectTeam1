namespace NotifyService.Model
{
    public class Address
    {
        public long AddressId { get; set; }
        public string HouseNo { get; set; }
        public string Landmark { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int Pincode { get; set; }
        public string UserEmailId { get; set; }
        //public User User { get; set; }
    }
}
