using BackendDarts.domein;
using BackendDarts.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackendDarts.data
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Leg> Legs{ get; set; }

        public DbSet<Player> Players { get; set; }
        public DbSet<DartThrow> DartThrows { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {   
        }
    }
}
