using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class PlayerGame
    {
        public int PlayerGameId { get; set; }
        public int GameId { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; }
        public Game Game { get; set; }

        public List<Leg> Throws { get; set; }

        public PlayerGame()
        {

        }
    }
}
