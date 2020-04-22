using BackendDarts.Domain.Models;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendDarts.Domain
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Turn> Turns { get; set; }
        public DbSet<LegGroup> LegGroups { get; set; }
        public DbSet<PlayerLeg> PlayerLegs { get; set; }
        public DbSet<PlayerGame> PlayerGames { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<DartThrow> DartThrows { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }


        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected ApplicationDbContext() { }
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<PlayerGame>().HasKey(x => new
            {
                x.GameId,
                x.PlayerId
            });
            builder.Entity<PlayerTournament>().HasKey(x => new
            {
                x.TournamentId,
                x.PlayerId
            });
            //builder.ApplyConfiguration(new GameConfiguration());
            //builder.ApplyConfiguration(new GameConfiguration());
            //builder.ApplyConfiguration(new PlayerConfiguration());
            //builder.ApplyConfiguration(new PlayerGameConfiguratie());
        }

    }
}
