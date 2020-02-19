using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Mappers
{
    public class PlayerGameConfiguratie : IEntityTypeConfiguration<PlayerGame>
    {
        public void Configure(EntityTypeBuilder<PlayerGame> builder)
        {
            builder.ToTable("PlayerGame");
            builder.HasKey(pg => pg.PlayerGameId);
            builder.HasOne(pg => pg.Player).WithMany(p => p.PlayerGames).HasForeignKey(p => p.PlayerId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(pg => pg.Game).WithMany().HasForeignKey(g => g.GameId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
