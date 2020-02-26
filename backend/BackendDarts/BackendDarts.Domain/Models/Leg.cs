using System.Collections.Generic;

namespace BackendDarts.Models
{
    public class Leg
    {
        public int Id { get; set; }
        public int LegNr { get; set; }
        public List<DartThrow> Throws { get; set; }

        public Leg()
        {
            Throws = new List<DartThrow>();
        }
    }
}
