using System;
using System.Collections.Generic;

namespace BackendDarts.Models
{
    public class Game
    {
        public Game()
        {
            beginDate = DateTime.Now.Date;
            Winner = -1;
            PlayerGames = new List<PlayerGame>();
        }

        public void FinishGame(int id)
        {
            Winner = id;
            endDate = DateTime.Now.Date;
        }

        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<PlayerGame> PlayerGames { get; set; }
        public int Winner { get; set; }
    }
}
