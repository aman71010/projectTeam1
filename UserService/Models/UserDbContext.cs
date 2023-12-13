using Microsoft.EntityFrameworkCore;

namespace UserService.Models
{
    public class UserDbContext: DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options): base(options) 
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> UserAddresses { get; set; }
    }
}
