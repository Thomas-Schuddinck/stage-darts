using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class PlayerLeg
    {
        public int Id { get; set; }
        public Player Player { get; set; }

        public List<Turn> Turns { get; set; }

        public PlayerLeg()
        {
            Turns = new List<Turn>();
        }
    }
}
