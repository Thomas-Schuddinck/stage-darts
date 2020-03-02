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
        }

        public void FinishGame(int id)
        {
            Winner = id;
            endDate = DateTime.Now.Date;
        }

        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<LegGroup> LegGroups { get; set; } = new List<LegGroup>();
        public int Winner { get; set; }
        public ICollection<PlayerGame> PlayerGames { get; set; } = new List<PlayerGame>();

        public void AddPlayer(Player p)
        {
            PlayerGames.Add(new PlayerGame
                {
                Player = p,
                Game = this
            }
            );
        }
    }
}
