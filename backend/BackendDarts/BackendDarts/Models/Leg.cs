using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class Leg
    {
        public int LegId { get; set; }
        public int legNr { get; set; }
        public List<DartThrow> Throws { get; set; }

        public Leg()
        {

        }
    }
}
