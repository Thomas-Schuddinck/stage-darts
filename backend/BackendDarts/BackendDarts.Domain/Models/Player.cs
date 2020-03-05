using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Game> Games { get; set; }

        public Player(string name) : this()
        {
            this.Name = name;

        }
        public Player()
        {
            
            Games = new List<Game>();

        }

    }
}
