using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class PlayerLeg
    {
        public int Id { get; set; }
        public Player Player { get; set; }

        public List<Turn> Turns { get; set; }
        [NotMapped]
        public int TotalScore => Turns.Sum(t => t.Throws.Sum(th => th.Value));
        public PlayerLeg()
        {
            Turns = new List<Turn>();
        }

        public PlayerLeg(Player player) : this()
        {
            Player = player;
        }

        public void AddTurn()
        {
            Turns.Add(new Turn(Turns.Count + 1));
        }

        public bool GoBack()
        {
            if(Turns[Turns.Count - 1].GoBack())
            {
                Turns.RemoveAt(Turns.Count - 1);
                return true;
            }
            return false;
        }
    }
}
