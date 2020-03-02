using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Mappers
{
    public class PlayerLegConfiguratie : IEntityTypeConfiguration<PlayerLeg>
    {
        public void Configure(EntityTypeBuilder<PlayerLeg> builder)
        {
            builder.ToTable("PlayerLeg");
            builder.HasKey(pg => pg.Id);
            builder.HasOne(pg => pg.Player).WithMany().OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(pg => pg.Turns).WithOne().OnDelete(DeleteBehavior.Cascade);

        }
    }
}
