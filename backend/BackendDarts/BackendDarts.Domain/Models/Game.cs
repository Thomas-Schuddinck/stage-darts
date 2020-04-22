using BackendDarts.Domain.Models;
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
        public int CurrentPlayerLegIndex { get; set; } = -1;
        public LegGroup CurrentLegGroup { get; set; }
        [NotMapped]
        public static Game SingletonGame { get; set; }

        //For Tournaments
        public int BracketSectorNumber { get; private set; }
        public int BracketStageNumber { get; private set; }
        public bool CanStart => PlayerGames.Count == 2;

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

        /// <summary>
        /// for tournament games
        /// </summary>
        /// <param name="bracketSectorNr"></param>
        /// <param name="name"></param>
        /// <param name="player1"></param>
        /// <param name="player2"></param>
        public Game(int bracketSectorNr, int bracketStageNr, string name, List<Player> players)
        {
            BracketSectorNumber = bracketSectorNr;
            BracketStageNumber = bracketStageNr;
            Name = name;
            Type = 3;
            foreach(Player player in players)
                AddPlayer(player);
            BeginDate = DateTime.Now.Date;
            SetupGame();
        }



       

        /// <summary>
        /// (re)set all simple values
        /// </summary>
        public void SetupGame()
        {
            Winner = -1;
            ResetNextPlayer();
        }

        public void ConfigureGame()
        {
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
            SingletonGame = game;
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
        public void SetLegWinner()
        {
            CurrentLegGroup.SetLegWinner(GetCurrentPlayer().Id);
            if(LegGroups.Count(lg => lg.Winner == GetCurrentPlayer().Id)==2)
                Winner = GetCurrentPlayer().Id;
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

        public void GoBack()
        {
            if (HasThrows())
            {
                Winner = -1;
                CurrentLegGroup.Winner = -1;
                if (GetCurrenPlayerLeg().GoBack())
                {
                    CurrentPlayerLegIndex = (CurrentPlayerLegIndex - 1 + PlayerGames.Count) % PlayerGames.Count;
                    GetCurrentTurn().ReopenTurn();
                    GetCurrenPlayerLeg().GoBack();
                }
            }
        }

        public bool HasThrows()
        {
            foreach (PlayerLeg playerLeg in CurrentLegGroup.PlayerLegs)
            {
                if (playerLeg.Turns.Count > 0 && playerLeg.Turns[0].Throws.Count > 0)
                    return true;
            }
            return false;
        }

        /// <summary>
        /// Update the current player value
        /// </summary>
        public void SetNextPlayer()
        {
            CurrentPlayerLegIndex = (CurrentPlayerLegIndex + 1) % PlayerGames.Count;

        }

        /// <summary>
        /// reset the current player value
        /// </summary>
        public void ResetNextPlayer()
        {
            CurrentPlayerLegIndex = 0;
        }

        /// <summary>
        /// Add a new LegGroup with a PlayerLeg for every player
        /// </summary>
        public void SetNextLegGroup()
        {
            LegGroup legGroup = new LegGroup
            {
                Legnr = LegGroups.Count + 1
            };
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
            SetLegWinner();
            SortPlayers();
            AddLegGroupToHistory();
            SetNextLegGroup();
            SortPlayerLegs();
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
        /// <param name="area">the area where a single dart landed</param>
        /// <param name="multiplier">the multiplier of a single dart throw</param>
        /// <returns>true if the turn is full and so has ended</returns>
        public bool AddThrow(int area, int multiplier)
        {
            return GetCurrentTurn().AddThrow(area, multiplier);
            
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
            return CurrentLegGroup.PlayerLegs[CurrentPlayerLegIndex];
        }
        /// <summary>
        /// Get the previous PlayerLeg for the current Player
        /// </summary>
        /// <returns>The previous PlayerLeg for the current Player</returns>
        public PlayerLeg GetPreviousPlayerLeg()
        {
            return CurrentLegGroup.PlayerLegs[(CurrentPlayerLegIndex-1)% CurrentLegGroup.PlayerLegs.Count];
        }

        /// <summary>
        /// Get the current Player
        /// </summary>
        /// <returns>The current Player</returns>
        public Player GetCurrentPlayer()
        {
            return GetCurrenPlayerLeg().Player;
        }
        public Player GetNextPlayer()
        {
            return CurrentLegGroup.PlayerLegs[(CurrentPlayerLegIndex + 1) % PlayerGames.Count].Player;
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

        /// <summary>
        /// Get the previous turn for the current PlayerLeg for the current Player
        /// </summary>
        /// <returns>The previous Turn</returns>
        public Turn GetPreviousTurn()
        {
            int size = GetCurrenPlayerLeg().Turns.Count;
            return size > 0 ? GetCurrenPlayerLeg().Turns[size - 2] : new Turn();
        }

        #endregion

        #region Tournament Operations

        public void CheckNameTournamentGame()
        {
            if (CanStart)

                Name = Name + " Tournament - " + PlayerGames[0].Player.Name + " VS " + PlayerGames[1].Player.Name;
        } 

        public void RemovePlayer(Player player)
        {
            PlayerGames.Remove(PlayerGames.Find(pg => pg.PlayerId == player.Id));
        }
        #endregion


    }
}
