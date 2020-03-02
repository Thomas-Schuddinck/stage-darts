using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Mappers
{
    public class PlayerGameConfiguration : IEntityTypeConfiguration<PlayerGame>
    {
        public void Configure(EntityTypeBuilder<PlayerGame> builder)
        {
            builder.ToTable("PlayerGame");

            builder.HasKey(pg => new {
                pg.PlayerId,
                pg.GameId
            });
            builder.HasOne(pg => pg.Player).WithMany().HasForeignKey(p => p.PlayerId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(pg => pg.Game).WithMany(g => g.PlayerGames).HasForeignKey(g => g.GameId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
