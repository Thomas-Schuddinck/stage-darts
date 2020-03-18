using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace BackendDarts.Models
{
    public class Game
    {
        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<LegGroup> LegGroups { get; set; } = new List<LegGroup>();
        public int Winner { get; set; }
        public List<PlayerGame> PlayerGames { get; set; } = new List<PlayerGame>();
        //new for game verloop
        public int currentPlayerIndex { get; set; }
        [NotMapped]
        public static Game singletonGame { get; set; }

        public Game()
        {
            beginDate = DateTime.Now.Date;
            Winner = -1;
            currentPlayerIndex = 0;
        }

        #region GameOperations

        /// <summary>
        /// Start or resume a new/ongoing game.
        /// This will set this particular game as the current game.
        /// </summary>
        /// <param name="game">The game that has to start/resume</param>
        public static void StartGame(Game game)
        {
            singletonGame = game;
        }

        /// <summary>
        /// Finish this game
        /// </summary>
        /// <param name="winnerId">The player ID of the winner</param>
        public void FinishGame(int winnerId)
        {
            Winner = winnerId;
            endDate = DateTime.Now.Date;
        }

        /// <summary>
        /// Determine the winner of the given LegGroup.
        /// This is called when someone throws a total of  and therefore the current player will be the winner
        /// </summary>
        /// <param name="legGroup"></param>
        public void DetermineWinner(LegGroup legGroup)
        {
            legGroup.Winner = legGroup.PlayerLegs[currentPlayerIndex].Player.Id;
        }

        /// <summary>
        /// Calculate the score for a given playerleg
        /// </summary>
        /// <param name="playerLeg">The given PlayerLeg</param>
        /// <returns>The total thrown value</returns>
        public int CalculateScore(PlayerLeg playerLeg)
        {
            int result = 0;
            foreach (Turn turn in playerLeg.Turns)
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

        /// <summary>
        /// Update the current player value
        /// </summary>
        public void SetNextPlayer()
        {
            currentPlayerIndex = (currentPlayerIndex + 1) % PlayerGames.Count;

        }

        /// <summary>
        /// Create a new empty turn for a given PlayerLeg
        /// </summary>
        /// <param name="playerLeg">The given PlayerLeg</param>
        public void CreateEmptyTurn(PlayerLeg playerLeg)
        {
            playerLeg.AddTurn();
        }

        /// <summary>
        /// End the current Leg(Group)
        /// This method gets called when someone throws a total of 501
        /// </summary>
        public void EndLeg()
        {
            int curIndex = LegGroups.Count - 1;
            LegGroup prevLegGroup = LegGroups[curIndex];
            DetermineWinner(prevLegGroup);
            SortPlayers(prevLegGroup);
            AddLeg();
            currentPlayerIndex = 0;
        } 
        #endregion

        #region SortMethods

        /// <summary>
        /// Sort the list of PlayerGames based on their score in the last Leg.
        /// Players who threw less will be placed before players with a better score.
        /// This score only takes in account the last Leg(Group).
        /// </summary>
        /// <param name="previousLegGroup">The last completed LegGroup</param>
        public void SortPlayers(LegGroup previousLegGroup)
        {
            List<PlayerGame> playerCopy = new List<PlayerGame>(PlayerGames);
            PlayerGames.Clear();
            List<PlayerScoreSorter> sorteerlijst = new List<PlayerScoreSorter>();
            foreach (PlayerLeg pl in previousLegGroup.PlayerLegs)
            {
                PlayerScoreSorter psr = new PlayerScoreSorter();
                psr.Player = pl.Player;
                psr.Score = CalculateScore(pl);
                sorteerlijst.Add(psr);
            }
            sorteerlijst.Sort((x, y) => (x.Score.CompareTo(y.Score)));
            foreach (PlayerScoreSorter psr in sorteerlijst)
            {
                PlayerGames.Add(playerCopy.Find(pl => pl.Player.Id == psr.Player.Id));
            }
        }

        /// <summary>
        /// Sort the list of PlayerLegs based on the list of the PlayerGames
        /// </summary>
        public void SortPlayerLegs()
        {
            LegGroup legGroup = GetCurrenLegGroup();
            legGroup.PlayerLegs = legGroup.PlayerLegs.OrderBy(p => PlayerGames.IndexOf(PlayerGames.Find(pg => pg.PlayerId == p.Player.Id))).ToList();


        }

        #endregion

        #region AddMethods

        /// <summary>
        /// Add a new LegGroup with a PlayerLeg for every player
        /// </summary>
        public void AddLeg()
        {
            //TODO checked als ze in volgorde zitten            
            LegGroup lg = new LegGroup();
            lg.Legnr = LegGroups.Count + 1;
            foreach (PlayerGame pg in PlayerGames)
            {
                lg.PlayerLegs.Add(new PlayerLeg(pg.Player));
            }
            LegGroups.Add(lg);
        }

        /// <summary>
        /// Add a new Turn for a given Player
        /// </summary>
        /// <param name="player">The Player who's given a new Turn</param>
        public void AddTurn(Player player)
        {
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            PlayerLeg currentLegFromPlayer = currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == player.Id);
            currentLegFromPlayer.AddTurn();
        }

        /// <summary>
        /// Add a new Throw to the game
        /// </summary>
        /// <param name="value">the value of what was thrown with a single dart</param>
        public void AddThrow(int value)
        {
            Player p = PlayerGames[currentPlayerIndex].Player;
            LegGroup currentLegGroup = LegGroups[LegGroups.Count - 1];
            PlayerLeg currentLegFromPlayer = currentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == p.Id);
            currentLegFromPlayer.Turns[currentLegFromPlayer.Turns.Count - 1].AddThrow(value);
        }

        /// <summary>
        /// Add a new Player to the game
        /// </summary>
        /// <param name="player">The new Player</param>
        public void AddPlayer(Player player)
        {
            PlayerGames.Add(new PlayerGame
            {
                Player = player,
                Game = this
            }
            );
        }
        #endregion

        #region GetMethods

        /// <summary>
        /// Get the current PlayerLeg for the current Player
        /// </summary>
        /// <returns>The current PlayerLeg for the current Player</returns>
        public PlayerLeg GetCurrenPlayerLeg()
        {
            return GetCurrenLegGroup().PlayerLegs.Find(pl => pl.Player.Id == GetCurrentPlayer().Id);
        }

        /// <summary>
        /// Get The current LegGroup
        /// </summary>
        /// <returns>The current LegGroup</returns>
        public LegGroup GetCurrenLegGroup()
        {
            return LegGroups[LegGroups.Count - 1];
        }

        /// <summary>
        /// Get the current Player
        /// </summary>
        /// <returns>The current Player</returns>
        public Player GetCurrentPlayer()
        {
            return PlayerGames[currentPlayerIndex].Player;
        }


        #endregion


    }
}
