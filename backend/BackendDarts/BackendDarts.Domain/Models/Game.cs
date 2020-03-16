using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendDarts.Models
{
    public class Game
    {
        [NotMapped]
        public static Game singletonGame { get; set; }

        public Game()
        {
            beginDate = DateTime.Now.Date;
            Winner = -1;
            currentPlayerIndex = 0;
        }

        public static void StartGame(Game game)
        {
            singletonGame = game;
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
        public List<PlayerGame> PlayerGames { get; set; } = new List<PlayerGame>();
        //new for game verloop
        public int currentPlayerIndex { get; set; }


        public void CreateNextTurn()
        {
            currentPlayerIndex = (currentPlayerIndex + 1) % PlayerGames.Count;
            Player player = PlayerGames[currentPlayerIndex].Player;
            PlayerLeg pl = LegGroups[LegGroups.Count - 1].PlayerLegs.Find(p => p.Player.Id == player.Id);
            CreateEmptyTurn(pl);
        }
        public void CreateEmptyTurn(PlayerLeg pl)
        {
            pl.AddTurn();
        }


        public void EndLeg()
        {
            int curIndex = LegGroups.Count - 1;
            LegGroup prevLegGroup = LegGroups[curIndex];
            DetermineWinner(prevLegGroup);
            SortPlayers(prevLegGroup);
            AddLeg();
            LegGroup currentLegGroup = LegGroups[curIndex + 1];
            currentPlayerIndex = 0;
        }

        public void DetermineWinner(LegGroup lg)
        {
            lg.Winner = lg.PlayerLegs[currentPlayerIndex].Player.Id;
        }

        public void SortPlayers(LegGroup prevGroup)
        {
            List<PlayerGame> playerCopy = new List<PlayerGame>(PlayerGames);
            PlayerGames.Clear();
            List<PlayerScoreSorter> sorteerlijst = new List<PlayerScoreSorter>();
            foreach(PlayerLeg pl in prevGroup.PlayerLegs)
            {
                PlayerScoreSorter psr = new PlayerScoreSorter();
                psr.Player = pl.Player;
                psr.Score = CalculateScore(pl);
                sorteerlijst.Add(psr);
            }
            sorteerlijst.Sort((x, y) => (x.Score.CompareTo(y.Score)));
            foreach(PlayerScoreSorter psr in sorteerlijst)
            {
                PlayerGames.Add(playerCopy.Find(pl => pl.Player.Id == psr.Player.Id));
            }
            
        }
        public int CalculateScore(PlayerLeg pl)
        {
            int result = 0;
            foreach(Turn turn in pl.Turns)
            {
                if (!turn.IgnoreScore)
                {

                    foreach (DartThrow dartThrow in turn.Throws)
                    {
                        result += dartThrow.Value;
                    }
                }
            }
            return result;
        }

        public void AddLeg()
        {
            LegGroup lg = new LegGroup();
            lg.Legnr = LegGroups.Count + 1;
            foreach(PlayerGame pg in PlayerGames)
            {
                lg.PlayerLegs.Add(new PlayerLeg(pg.Player));
            }
            LegGroups.Add(lg);
        }

        public void AddTurn(Player p)
        {
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            PlayerLeg currentLegFromPlayer = currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == p.Id);
            currentLegFromPlayer.AddTurn();
        }

        public void AddThrow(int value)
        {
            Player p = PlayerGames[currentPlayerIndex].Player;
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            PlayerLeg currentLegFromPlayer = currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == p.Id);
            currentLegFromPlayer.Turns[currentLegFromPlayer.Turns.Count-1].AddThrow(value);
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

        public PlayerLeg GetCurrenPlayerLeg()
        {
            Player p = PlayerGames[currentPlayerIndex].Player;
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            return currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == p.Id);
        }
    }
}
