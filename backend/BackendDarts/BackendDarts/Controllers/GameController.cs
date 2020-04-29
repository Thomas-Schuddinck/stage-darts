using System;
using System.Collections.Generic;
using System.Linq;
using BackendDarts.data.Repos.IRepos;
using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Domain.DTOs;
using BackendDarts.Domain.Models;
using BackendDarts.DTOs;
using BackendDarts.DTOs.Status;
using BackendDarts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BackendDarts.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameRepository _gameRepository;
        private IPlayerRepository _playerRepository;
        private ITournamentRepository _tournamentRepository;
        private IHubContext<NotifyHub, ITypedHubClient> _hubContext;
        private GameControllerHelpers Helper;

        public GameController(IGameRepository gameRepository, IPlayerRepository playerRepository, ITournamentRepository tournamentRepository, IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _gameRepository = gameRepository;
            _playerRepository = playerRepository;
            _tournamentRepository = tournamentRepository;
            _hubContext = hubContext;
            Helper = new GameControllerHelpers();
            
        }


        ///////////////////////////////////API METHODS/////////////////////////////////////////

        ///////////////////////////////////GET/////////////////////////////////////////////////

        #region GET API Methods

        /// <summary>
        /// Get a list of all games, containing simplified games
        /// </summary>
        /// <returns>A lsit of all games</returns>
        [HttpGet]
        public IEnumerable<GameDTO> GetAll()
        {
            return _gameRepository.GetAll().Select(game => new GameDTO(game)).ToList();
        }

        [HttpGet]
        [Route("/gamelist/all")]
        public IEnumerable<GameDTO> GetAllGameList()
        {
            return _gameRepository.GetAllWithPlayers().Select(game => new GameDTO(game)).ToList();
        }

        [HttpGet]
        [Route("/gamelist/unfinishedNT")]
        public IEnumerable<GameDTO> GetAllUnfinishedNonTournamentGameList()
        {
            return _gameRepository.GetAllWithPlayers().Where(g => (g.Winner == -1 && g.Type != 3)).Select(game => new GameDTO(game)).ToList();
        }

        /// <summary>
        /// Get a leaderboard overview
        /// </summary>
        /// <returns>The leaderboard overview for all players</returns>
        [HttpGet]
        [Route("/leaderboard")]
        public List<LeaderboardRowDTO> GetLeaderboard()
        {
            return CreateLeaderBoardDTO(MapPlayerStatisticsData());
        }
               
        /// <summary>
        /// Get a game with given ID, detailed version
        /// </summary>
        /// <param name="id">The ID of the requested game</param>
        /// <returns>The requested game</returns>
        [HttpGet("{id}")]
        public ActionResult<GameDetailsDTO> GetBy(int id)
        {
            Game game = _gameRepository.GetBy(id);
            if (game == null) return NoContent();
            
            // sort playerlegs by players
            game.SortPlayerLegs();

            // set game as current game (singleton)
            Game.StartGame(game);

            GameDetailsDTO gamedetails = new GameDetailsDTO(game);

            return gamedetails;

        }

        [HttpGet("overview/{id}")]
        public ActionResult<GameOverviewDTO> GetGameOverview(int id)
        {
            Game game = _gameRepository.GetBy(id);
            if (game == null) return NoContent();

            GameOverviewDTO gameoverview = new GameOverviewDTO(game);
            Dictionary<string, int> dict = Helper.CalculateLegWinners(game);
            foreach(string i in dict.Keys)
            {
                gameoverview.LegWinners.Add(new LegWinnersDTO(i, dict[i]));
            }
            gameoverview.Winner = game.Winner == -1 ? "No winner yet": game.FindPlayerById(game.Winner).Name;

            return gameoverview;

        }

        
        #endregion

        ///////////////////////////////////POST////////////////////////////////////////////////

        #region POST API Methods
        /// <summary>
        /// Add a new game from given NewGameDTO
        /// </summary>
        /// <param name="newGame">the given NewGameDTO containing game information</param>
        /// <returns>The newly made game</returns>
        [HttpPost("new-game/")]
        public ActionResult<GenericCreationDTO> AddNewGame([FromBody]GenericCreationDTO newGame)
        {

            Game game = CreateGame(newGame);
            return CreatedAtAction(nameof(GetBy), new { id = game.Id }, game);

        }
        
        /// <summary>
        /// Hub connection check method
        /// </summary>
        /// <param name="msg">A message to test the connection</param>
        /// <returns>Return "succes" if connection works</returns>
        [HttpPost]
        public string Post([FromBody]Message msg)
        {
            string retMessage;
            try
            {
                _hubContext.Clients.All.BroadcastMessage(msg.Type, msg.Payload);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return retMessage;
        }

        /// <summary>
        /// Add a new dartthrow to the current game
        /// </summary>
        /// <param name="dartThrow">the new DartThrow</param>
        /// <returns>The current game</returns>
        [HttpPost("game/")]
        public ActionResult<StatusDTO> AddNewThrow([FromBody]NewThrowDTO dartThrow)
        {
            Game currentGame = _gameRepository.GetBy(Game.SingletonGame.Id);
            int status = Helper.HandleThrow(currentGame, dartThrow);
            _gameRepository.SaveChanges();

            currentGame = _gameRepository.GetBy(Game.SingletonGame.Id);
            StatusDTO statusDTO = Helper.FillStatusDTO(currentGame, status);

            _hubContext.Clients.All.UpdateGame(statusDTO);

            return statusDTO;
        }
        #endregion

        ///////////////////////////////////PUT/////////////////////////////////////////////////

        #region PUT API Methods

        [HttpPut("throwedit/{id}/{idThrow}/{value}")]
        /// <summary>
        /// Edit a throw of a given game with given dartthrow
        /// </summary>
        /// <param name="id">ID of the game to update</param>
        /// <param name="idThrow">ID of the dartthrow to update</param>
        /// <param name="value">the score of the throw</param>
        /// <returns>The updated game</returns>
        public ActionResult<StatusDTO> EditThrow(int id, int idThrow, int area, int multiplier)
        {
            Game game = _gameRepository.GetBy(id);

            game.CurrentLegGroup.PlayerLegs.ForEach(pl => pl.Turns.ForEach(th => th.Throws.ForEach(thr =>
            {
                if (thr.Id == idThrow)
                {
                    thr.Area = area;
                    thr.Multiplier = multiplier;
                }

            })));

            Game currentGame = _gameRepository.GetBy(Game.SingletonGame.Id);

            StatusDTO statusDTO = Helper.FillStatusDTO(currentGame, -1);
            _gameRepository.SaveChanges();
            _hubContext.Clients.All.UpdateGame(statusDTO);

            return statusDTO;
        }
        /// <summary>
        /// Let a given player join a game with given ID
        /// </summary>
        /// <param name="id">The ID of the game the player requst to join</param>
        /// <param name="idPlayer">The player to add to game's players</param>
        /// <returns>The game the player joined</returns>
        [HttpPut("{id}/{idPlayer}")]
        public ActionResult<GameDTO> JoinGame(int id, int idPlayer)
        {
            Game game = _gameRepository.GetBy(id);
            foreach (PlayerGame pg in game.PlayerGames)
            {
                if (pg.PlayerId == idPlayer)
                {
                    return BadRequest("Player already in game");
                }
            }
            Player player = _playerRepository.GetBy(idPlayer);
            game.AddPlayer(player);
            _gameRepository.SaveChanges();
            return new GameDTO(game);
        }

        /// <summary>
        /// Go back one step in time
        /// </summary>
        /// <returns>The game with one step back in time</returns>
        [HttpPut("letsGoBackInTimeBaby")]
        public ActionResult<GameDTO> GoBack()
        {
            Game game = _gameRepository.GetBy(Game.SingletonGame.Id);
            game.GoBack();
            _gameRepository.SaveChanges();
            StatusDTO statusDTO = Helper.FillStatusDTO(game, -1);
            _gameRepository.SaveChanges();
            _hubContext.Clients.All.UpdateGame(statusDTO);
            return new GameDTO(game);
        }
        #endregion

        ///////////////////////////////////DELETE//////////////////////////////////////////////

        #region DELETE API Methods
        /// <summary>
        /// Delete a game where the ID of the game matches the given ID
        /// </summary>
        /// <param name="id">The given ID</param>
        /// <returns>The removed Game</returns>
        [HttpDelete("{id}")]
        public ActionResult<GameDTO> Delete(int id)
        {
            Game game = _gameRepository.GetBy(id);
            _gameRepository.Delete(game);
            _gameRepository.SaveChanges();
            return new GameDTO(game);
        }
        #endregion



        ///////////////////////////////////SUPPORT METHODS/////////////////////////////////////

        ///////////////////////////////////LEADERBOARD SUPPORT/////////////////////////////////

        #region Leaderboard Support Methods


        /// <summary>
        /// Create a DTO which contains the data for creating a leaderboard
        /// </summary>
        /// <param name="temporaryPlayerDictionary">A dictionary containing playerstatistics per player</param>
        /// <returns>A list of leaderboard rows (DTO-format)</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public List<LeaderboardRowDTO> CreateLeaderBoardDTO(Dictionary<int, LeaderboardPlayerDataDTO> temporaryPlayerDictionary)
        {
            List<LeaderboardRowDTO> leaderboard = new List<LeaderboardRowDTO>();
            foreach (KeyValuePair<int, LeaderboardPlayerDataDTO> playerdata in temporaryPlayerDictionary)
            {
                leaderboard.Add(FillLeaderboardRowDTO(playerdata.Key, playerdata.Value));
            }
            return leaderboard;
        }

        /// <summary>
        /// Map the statistics for all players to a dictionary
        /// </summary>
        /// <returns>A dictionary with player statistics</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public Dictionary<int, LeaderboardPlayerDataDTO> MapPlayerStatisticsData()
        {
            Dictionary<int, LeaderboardPlayerDataDTO> playerStatisticsDictionary = FillPlayerDictionaryWithEmptyValues();

            // database doorlopen en gegevens per speler opvullen
            foreach (Game game in _gameRepository.GetAllDetailed())
            {
                // if there's no winner
                if (game.Winner != -1)
                {
                    playerStatisticsDictionary[game.Winner].NumberOfWins = playerStatisticsDictionary[game.Winner].NumberOfWins + 1;
                }

                foreach (LegGroup lg in game.LegGroups)
                {
                    

                    foreach (PlayerLeg pg in lg.PlayerLegs)
                    {
                        foreach (Turn turn in pg.Turns)
                        {
                            foreach (DartThrow dt in turn.Throws)
                            {
                                // keep count of the number of throws for a player
                                playerStatisticsDictionary[pg.Player.Id].TotalNumberDartsThrown += 1;

                                // calculate the total score a player has thrown
                                playerStatisticsDictionary[pg.Player.Id].TotalScoreThrown += dt.Value;

                                // if a player has thrown sixty (the highest possible score), increment the sixties-counter
                                if (dt.Value == 60)
                                {
                                    playerStatisticsDictionary[pg.Player.Id].NumberOfSixties = playerStatisticsDictionary[pg.Player.Id].NumberOfSixties + 1;
                                }
                            }
                        }
                    }
                }
            }
            return playerStatisticsDictionary;
        }


        /// <summary>
        /// Fill a new dictionary for player statistics with 0's with playerId's as kays
        /// </summary>
        /// <returns>A new Dictionary containing 0's for all values</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public Dictionary<int, LeaderboardPlayerDataDTO> FillPlayerDictionaryWithEmptyValues()
        {
            // variables
            Dictionary<int, LeaderboardPlayerDataDTO> temporaryPlayerDictionary = new Dictionary<int, LeaderboardPlayerDataDTO>();

            // fills (the dictionary with all players and fill values with 0's)
            foreach (Player player in _playerRepository.GetAll())
            {
                temporaryPlayerDictionary.Add(player.Id, new LeaderboardPlayerDataDTO());
                temporaryPlayerDictionary[player.Id].NumberOfSixties = 0;
                temporaryPlayerDictionary[player.Id].NumberOfWins = 0;
                temporaryPlayerDictionary[player.Id].TotalGamesPlayed = 0;
                temporaryPlayerDictionary[player.Id].TotalNumberDartsThrown = 0;
                temporaryPlayerDictionary[player.Id].TotalScoreThrown = 0;
            }

            // return
            return temporaryPlayerDictionary;
        }

        /// <summary>
        /// Fill a new leaderboard row DTO
        /// </summary>
        /// <param name="playerId">The ID of the player</param>
        /// <param name="playerDataDTO">The player data for the leaderboard</param>
        /// <returns>The leaderbord row (DTO format)</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public LeaderboardRowDTO FillLeaderboardRowDTO(int playerId, LeaderboardPlayerDataDTO playerDataDTO)
        {
            // variables
            int numberofgames = _playerRepository.GetAllGamesFromPlayer(playerId).Count();
            LeaderboardRowDTO leaderboardRowDTO = new LeaderboardRowDTO();
            PlayerDTO playerDTO = new PlayerDTO(_playerRepository.GetBy(playerId));

            // fills
            leaderboardRowDTO.player = playerDTO;
            leaderboardRowDTO.NumberOfWins = playerDataDTO.NumberOfWins;
            leaderboardRowDTO.PercentageWins = numberofgames == 0 ? 0 : playerDataDTO.NumberOfWins * 100 / numberofgames;
            leaderboardRowDTO.TotalScoreThrown = playerDataDTO.TotalScoreThrown;
            leaderboardRowDTO.PercentageSixties = playerDataDTO.TotalNumberDartsThrown == 0 ? 0 : playerDataDTO.NumberOfSixties / playerDataDTO.TotalNumberDartsThrown * 100;

            // return
            return leaderboardRowDTO;
        }


        #endregion

        ///////////////////////////////////CREATION SUPPORT////////////////////////////////////

        #region Creation Support Methods
        /// <summary>
        /// Create a new Game
        /// </summary>
        /// <param name="newGameDTO">The data containing the data for a new Game</param>
        /// <returns>The new Game</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public Game CreateGame(GenericCreationDTO newGameDTO)
        {
            Game game = new Game(newGameDTO);
            SetupGame(new GenericAssistDTO { Body = game, Players = newGameDTO.Players });
            _gameRepository.Add(game);
            _gameRepository.SaveChanges();
            return game;
        }

        /// <summary>
        /// Setting up the new given Game
        /// </summary>
        /// <param name="game">the new Game</param>
        /// <param name="newGame">The data containing the data for a new Game</param>
        [ApiExplorerSettings(IgnoreApi = true)]
        public void SetupGame(GenericAssistDTO dto)
        {
            Game game = ((Game)dto.Body);
            foreach (int id in dto.Players)
                game.AddPlayer(_playerRepository.GetBy(id));
            game.ConfigureGame();
        }

       
        #endregion
    }
} 
