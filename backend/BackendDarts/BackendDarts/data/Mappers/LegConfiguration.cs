using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BackendDarts.data.Mappers
{
    public class LegConfiguration : IEntityTypeConfiguration<Leg>
    {
        public void Configure(EntityTypeBuilder<Leg> builder)
        {
            builder.ToTable("Leg");
            builder.HasKey(l => l.Id);
            builder.HasMany(l => l.Throws).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}
