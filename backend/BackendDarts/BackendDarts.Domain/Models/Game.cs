using BackendDarts.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace BackendDarts.Models
{
    public class Game
    {
        public int Id { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public String Name { get; set; }
        public int Type { get; set; }
        public List<LegGroup> LegGroups { get; set; } = new List<LegGroup>();
        public int Winner { get; set; }
        public List<PlayerGame> PlayerGames { get; set; } = new List<PlayerGame>();
        //new for game verloop
        public int CurrentPlayerIndex { get; set; } = -1;
        public LegGroup CurrentLegGroup { get; set; }
        [NotMapped]
        public static Game singletonGame { get; set; }

        public Game()
        {
            BeginDate = DateTime.Now.Date;
            SetupGame();
        }

        public Game(NewGameDTO newGameDTO) : this()
        {
            Name = newGameDTO.Name;
            Type = newGameDTO.Type;
            
        }

        public void SetupGame()
        {
            Winner = -1;
            ResetNextPlayer();
            SetNextLegGroup();
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
            EndDate = DateTime.Now.Date;
        }

        /// <summary>
        /// Determine the winner of the given LegGroup.
        /// This is called when someone throws a total of  and therefore the current player will be the winner
        /// </summary>
        /// <param name="legGroup"></param>
        public void DetermineWinner()
        {
            CurrentLegGroup.FinishLeg(GetCurrentPlayer().Id);
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
            CurrentPlayerIndex = (CurrentPlayerIndex + 1) % PlayerGames.Count;

        }

        /// <summary>
        /// reset the current player value
        /// </summary>
        public void ResetNextPlayer()
        {
            CurrentPlayerIndex = 0;

        }

        /// <summary>
        /// Add a new LegGroup with a PlayerLeg for every player
        /// </summary>
        public void SetNextLegGroup()
        {
            //TODO checked als ze in volgorde zitten            
            LegGroup legGroup = new LegGroup();
            legGroup.Legnr = LegGroups.Count + 1;
            foreach (PlayerGame pg in PlayerGames)
            {
                legGroup.PlayerLegs.Add(new PlayerLeg(pg.Player));
            }
            CurrentLegGroup = legGroup;
        }

        /// <summary>
        /// Create a new empty turn for the current PlayerLeg
        /// </summary>
        public void CreateEmptyTurn()
        {
            GetCurrenPlayerLeg().AddTurn();
        }

        /// <summary>
        /// End the current Leg(Group)
        /// This method gets called when someone throws a total of 501
        /// </summary>
        public void EndLeg()
        {
            DetermineWinner();
            SortPlayers();
            AddLegGroupToHistory();
            SetNextLegGroup();
            ResetNextPlayer();
        } 
        #endregion

        #region SortMethods

        /// <summary>
        /// Sort the list of PlayerGames based on their score in the last Leg (at the moment of executio still the current).
        /// Players who threw less will be placed before players with a better score.
        /// This score only takes in account the last Leg(Group).
        /// </summary>
        /// 
        public void SortPlayers()
        {
            List<PlayerGame> playerCopy = new List<PlayerGame>(PlayerGames);
            PlayerGames.Clear();
            List<PlayerScoreSorter> sorteerlijst = new List<PlayerScoreSorter>();
            foreach (PlayerLeg pl in CurrentLegGroup.PlayerLegs)
            {
                PlayerScoreSorter psr = new PlayerScoreSorter
                {
                    Player = pl.Player,
                    Score = CalculateScore(pl)
                };
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
            CurrentLegGroup.PlayerLegs = CurrentLegGroup.PlayerLegs.OrderBy(p => PlayerGames.IndexOf(PlayerGames.Find(pg => pg.PlayerId == p.Player.Id))).ToList();
        }

        #endregion

        #region AddMethods


        /// <summary>
        /// Add a new Turn for the current Player
        /// </summary>
        public void AddTurn()
        {
            GetCurrenPlayerLeg().AddTurn();

        }

        /// <summary>
        /// Add a new Throw to the game
        /// </summary>
        /// <param name="value">the value of what was thrown with a single dart</param>
        public Boolean AddThrow(int value)
        {
            if (GetCurrentTurn().AddThrow(value))
            {
                AddTurn();
                return true;
            }
            return false;
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


        /// <summary>
        /// Add a the currentLegGroup to the list of previous leggroups
        /// </summary>
        public void AddLegGroupToHistory()
        {
            LegGroups.Add(CurrentLegGroup);
        }
        #endregion

        #region GetMethods

        /// <summary>
        /// Get the current PlayerLeg for the current Player
        /// </summary>
        /// <returns>The current PlayerLeg for the current Player</returns>
        public PlayerLeg GetCurrenPlayerLeg()
        {
            return CurrentLegGroup.PlayerLegs.Find(pl => pl.Player.Id == GetCurrentPlayer().Id);
        }

        /// <summary>
        /// Get the current Player
        /// </summary>
        /// <returns>The current Player</returns>
        public Player GetCurrentPlayer()
        {
            return PlayerGames[CurrentPlayerIndex].Player;
        }

        /// <summary>
        /// Get the current turn for the current PlayerLeg for the current Player
        /// </summary>
        /// <returns>The current Turn</returns>
        public Turn GetCurrentTurn()
        {
            int size = GetCurrenPlayerLeg().Turns.Count;
            return size > 0 ? GetCurrenPlayerLeg().Turns[size-1] : new Turn();
        }


        #endregion




    }
}
