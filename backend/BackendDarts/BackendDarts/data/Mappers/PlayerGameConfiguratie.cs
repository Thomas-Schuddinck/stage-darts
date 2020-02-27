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
            builder.HasKey(pg => pg.Id);
            builder.HasOne(pg => pg.Player).WithMany().OnDelete(DeleteBehavior.Restrict);
            
        }
    }
}
