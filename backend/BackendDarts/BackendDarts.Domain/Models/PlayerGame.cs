using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class PlayerGame
    {
        public int Id { get; set; }
        public Player Player { get; set; }

        public List<Leg> Legs { get; set; }

        public PlayerGame()
        {
            Legs = new List<Leg>();
        }
    }
}
