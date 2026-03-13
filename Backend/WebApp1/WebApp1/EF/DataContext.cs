using Microsoft.EntityFrameworkCore;
using WebApp1.Models;

namespace WebApp1.EF
{
    public class DataContext :DbContext
    {
     public DataContext(DbContextOptions<DataContext> options) : base(options){}
        public DbSet<project> projects { get; set; }
        public DbSet<Unit> units_ { get; set; }
        public DbSet<Client> clients { get; set; }
        public DbSet<Negotiation> negotiations { get; set; }    
        public DbSet<Negotiation_Phase> negotiation_phases { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Negotiation>()
                .Property(p => p.NegotiationDate)
                .HasColumnType("date");
        }

    }
}
