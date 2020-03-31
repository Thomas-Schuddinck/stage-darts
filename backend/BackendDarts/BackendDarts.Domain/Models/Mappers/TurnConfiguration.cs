using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BackendDarts.data.Mappers
{
    public class TurnConfiguration : IEntityTypeConfiguration<Turn>
    {
        public void Configure(EntityTypeBuilder<Turn> builder)
        {
            builder.ToTable("Turn");
            builder.HasKey(l => l.Id);
            builder.HasMany(l => l.Throws).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}
