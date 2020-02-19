using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendDarts.Domain
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Leg> Legs { get; set; }

        public DbSet<Player> Players { get; set; }
        public DbSet<DartThrow> DartThrows { get; set; }

        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected ApplicationDbContext() { }
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.ApplyConfiguration(new DartThrowConfiguration());
            //builder.ApplyConfiguration(new GameConfiguration());
            //builder.ApplyConfiguration(new GameConfiguration());
            //builder.ApplyConfiguration(new PlayerConfiguration());
            //builder.ApplyConfiguration(new PlayerGameConfiguratie());
        }

    }
}
