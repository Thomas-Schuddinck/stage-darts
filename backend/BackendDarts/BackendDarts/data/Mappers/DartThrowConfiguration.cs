using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Mappers
{
    public class DartThrowConfiguration : IEntityTypeConfiguration<DartThrow>
    {
        public void Configure(EntityTypeBuilder<DartThrow> builder)
        {
            builder.ToTable("DartThrow");
            builder.HasKey(dt => dt.DartThrowId);
        }
    }
}
