using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class Game
    {
        public Game()
        {
            Winner = -1;
            PlayerGames = new List<PlayerGame>();
        }

        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<PlayerGame> PlayerGames { get; set; }
        public int Winner { get; set; }
    }
}
