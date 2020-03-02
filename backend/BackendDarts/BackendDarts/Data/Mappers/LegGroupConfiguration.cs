using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Mappers
{
    public class LegGroupConfiguratie : IEntityTypeConfiguration<LegGroup>
    {
        public void Configure(EntityTypeBuilder<LegGroup> builder)
        {
            builder.ToTable("LegGroup");
            builder.HasKey(pg => pg.Id);
            builder.HasMany(pg => pg.PlayerLegs).WithOne().OnDelete(DeleteBehavior.Cascade);

        }
    }
}
