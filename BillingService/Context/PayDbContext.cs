using Microsoft.EntityFrameworkCore;
using PaymentService.Models;

namespace PaymentService.Context
{
    public class PayDbContext : DbContext
    {
        public PayDbContext(DbContextOptions<PayDbContext>options):base(options) 
        {
            Database.EnsureCreated();
        }
        public DbSet<OrderEntity>OrderEntities { get; set; }
        public DbSet<OrderRequest>OrderRequests { get; set; }
    }
}
