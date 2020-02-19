using BackendDarts.data.Mappers;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendDarts.data
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Leg> Legs{ get; set; }

        public DbSet<Player> Players { get; set; }
        public DbSet<DartThrow> DartThrows { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {   
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new DartThrowConfiguration());
            builder.ApplyConfiguration(new GameConfiguration());
            builder.ApplyConfiguration(new LegConfiguration());
            builder.ApplyConfiguration(new PlayerConfiguration());
            builder.ApplyConfiguration(new PlayerGameConfiguratie());
        }

    }
}
