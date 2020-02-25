using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class DartThrow
    {
        public int Id { get; set; }
        public int Value { get; set; }

        public DartThrow(int value)
        {
            this.Value = value;
        }
    }
}
