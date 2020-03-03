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
            currentPlayerIndex = 0;
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
        //new for game verloop
        public int currentPlayerIndex { get; set; }


        public void EndTurn()
        {
            currentPlayerIndex = (currentPlayerIndex + 1) % PlayerGames.Count;
        }


        public void EndLeg()
        {
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            currentPlayerIndex = 0;
        }

        public void SortPlayers(LegGroup legGroup)
        {
            List<PlayerGame> playerCopy = new List<PlayerGame>(PlayerGames);
            PlayerGames.Clear();
            //TODO
            //
            //
            //sorteer spelers van laag naar hoog op basis van vorige leggroup
            //
            //
            //
        }

        public void AddLeg()
        {
            LegGroup lg = new LegGroup();
            lg.Legnr = LegGroups.Count + 1;
            foreach(PlayerGame pg in PlayerGames)
            {
                lg.PlayerLegs.Add(new PlayerLeg(pg.Player));
            }
        }
        public void AddTurn(Player p)
        {
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            PlayerLeg currentLegFromPlayer = currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == p.Id);
            currentLegFromPlayer.AddTurn();
        }
        public void AddThrow(Player p)
        {
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            PlayerLeg currentLegFromPlayer = currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == p.Id);
            currentLegFromPlayer.AddTurn();
        }

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
