using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class DartThrow
    {
        public int Id { get; set; }
        public int Area { get; set; }
        public int Multiplier { get; set; }
        [NotMapped]
        public int Value => Area * Multiplier;

        public DartThrow(int area, int multiplier)
        {
            Area = area;
            Multiplier = multiplier;
        }
    }
}
