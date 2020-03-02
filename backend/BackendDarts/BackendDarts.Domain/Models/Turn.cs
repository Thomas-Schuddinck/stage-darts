using System.Collections.Generic;

namespace BackendDarts.Models
{
    public class Turn
    {
        public int Id { get; set; }
        public int TurnNr { get; set; }
        public List<DartThrow> Throws { get; set; }

        public Turn()
        {
            Throws = new List<DartThrow>();
        }
    }
}
