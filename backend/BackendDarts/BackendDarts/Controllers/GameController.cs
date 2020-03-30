using System;
using System.Collections.Generic;
using System.Linq;
using BackendDarts.data.Repos.IRepos;
using BackendDarts.Domain.DTOs;
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
        private IHubContext<NotifyHub, ITypedHubClient> _hubContext;

        public GameController(IGameRepository gameRepository, IPlayerRepository playerRepository, IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _gameRepository = gameRepository;
            _playerRepository = playerRepository;
            _hubContext = hubContext;
        }

        #region Call Methods
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

        /// <summary>
        /// Add a new game from given NewGameDTO
        /// </summary>
        /// <param name="newGame">the given NewGameDTO containing game information</param>
        /// <returns>The newly made game</returns>
        [HttpPost("new-game/")]
        public ActionResult<GameDTO> Post([FromBody]NewGameDTO newGame)
        {

            Game game = new Game(newGame);
            foreach (int id in newGame.Players)
                game.AddPlayer(_playerRepository.GetBy(id));
            _gameRepository.Add(game);
            _gameRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = game.Id }, game);

        }

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

        [HttpPut("throwedit/{id}/{idThrow}/{value}")]
        /// <summary>
        /// Edit a throw of a given game with given dartthrow
        /// </summary>
        /// <param name="id">ID of the game to update</param>
        /// <param name="idThrow">ID of the dartthrow to update</param>
        /// <param name="value">the score of the throw</param>
        /// <returns>The updated game</returns>
        public ActionResult<StatusDTO> AddThrow(int id, int idThrow, int value)
        {
            Game game = _gameRepository.GetBy(id);
            game.GetCurrentTurn().Throws.SingleOrDefault(t => t.Id == idThrow).Value = value;

            Game currentGame = _gameRepository.GetBy(Game.singletonGame.Id);

            StatusDTO statusDTO = FillStatusDTO(currentGame, -1);
            _gameRepository.SaveChanges();
            _hubContext.Clients.All.UpdateGame(statusDTO);

            return statusDTO;
        }
        /// <summary>
        /// LEt a given player join a game with given ID
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
        public ActionResult<StatusDTO> Post([FromBody]DartThrowDTO dartThrow)
        {
            Game currentGame = _gameRepository.GetBy(Game.singletonGame.Id);
            int status = HandleThrow(currentGame, dartThrow);
            _gameRepository.SaveChanges();

            currentGame = _gameRepository.GetBy(Game.singletonGame.Id);
            StatusDTO statusDTO = FillStatusDTO(currentGame, status);
            
            _hubContext.Clients.All.UpdateGame(statusDTO);

            return statusDTO;
        } 
        #endregion

        #region Support Methods

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

                foreach (LegGroup lg in game.LegGroups)
                {
                    // if there's no winner
                    if (lg.Winner != -1)
                    {
                        playerStatisticsDictionary[lg.Winner].NumberOfWins = playerStatisticsDictionary[lg.Winner].NumberOfWins + 1;
                    }

                    foreach (PlayerLeg pg in lg.PlayerLegs)
                    {
                        foreach (Turn turn in pg.Turns)
                        {
                            foreach (DartThrow dt in turn.Throws)
                            {
                                // keep count of the number of throws for a player
                                playerStatisticsDictionary[pg.Player.Id].TotalNumberDartsThrown = +1;

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
        /// Check if all darts are thrown for the current player's last turn
        /// </summary>
        /// <param name="playerLeg"></param>
        /// <returns>True if all the darts are thrown</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        private Boolean ValidateAllThrowsThrown(PlayerLeg playerLeg)
        {
            if (playerLeg.Turns[playerLeg.Turns.Count - 1].Throws.Count >= 3)
            {
                //playerLeg.Turns[playerLeg.Turns.Count - 1].EndTurn();
                return true;
            }
            return false;
        }

        /// <summary>
        /// Handle a new given dartthrow for given game
        /// </summary>
        /// <param name="game">The given game</param>
        /// <param name="dartThrow">The given throw</param>
        /// <returns>The status of the game</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        private int HandleThrow(Game game, DartThrowDTO dartThrow)
        {
            // variables
            PlayerLeg currentPlayerLeg = game.GetCurrenPlayerLeg();

            // calculations
            CreateNewTurnIfRequired(currentPlayerLeg, game);
            game.AddThrow(dartThrow.Value);
            Boolean allDartsThrown = ValidateAllThrowsThrown(currentPlayerLeg);

            int gameStatus = CheckGameStatus(game, game.CalculateScore(currentPlayerLeg));

            // if all darts are thrown, multiply status by 2 (see FillStatusDTO for use, used for ending turn)
            gameStatus = !allDartsThrown ? gameStatus : gameStatus * 2;

            return gameStatus;


        }

        /// <summary>
        /// Checks if a new Turn should be made.
        /// If the requirements are met, a new Turn will be added to the given PlayerLeg of a given Game
        /// </summary>
        /// <param name="playerLeg">The given PlayerLeg</param>
        /// <param name="game">The gvien Game</param>
        [ApiExplorerSettings(IgnoreApi = true)]
        private void CreateNewTurnIfRequired(PlayerLeg playerLeg, Game game)
        {
            //laatste turn in beurt eindig turn
            if (playerLeg.Turns.Count == 0 || playerLeg.Turns[playerLeg.Turns.Count - 1].IsFinished)
                game.CreateEmptyTurn(playerLeg);

        }

        /// <summary>
        /// Returns a status depending on the current game situation.
        /// 
        /// </summary>
        /// <param name="game">The current Game</param>
        /// <param name="score">The score of the current PlayerLeg</param>
        /// <returns>Returns "1" if the current Leg is finished (when a player reaches score 501), returns "2" if the game has ended, returns "-1" by default</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        private int CheckGameStatus(Game game, int score)
        {
            // variables
            Player currentPlayer = game.GetCurrentPlayer();
            PlayerLeg playerLeg = game.GetCurrenPlayerLeg();

            // calculations + returns
            if (score == 501)
            {
                //indien 3de leg gewonnen eindig game
                if (game.LegGroups.Count(lg => lg.Winner == currentPlayer.Id) == 3)
                {
                    game.Winner = currentPlayer.Id;
                    return 2;
                }
                //indien geen 3 legs maar wel uigespeeld eindig leg
                else
                {
                    game.EndLeg();
                    return 1;
                }
            }
            else
            {
                if (score > 501)
                    playerLeg.Turns[playerLeg.Turns.Count - 1].IgnoreAndEndTurn(); ;

                return -1;
            }

        }
        #endregion


        #region Fill Methods

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
            leaderboardRowDTO.PercentageWins = numberofgames == 0 ? 0 : (playerDataDTO.NumberOfWins / numberofgames) * 100;
            leaderboardRowDTO.TotalScoreThrown = playerDataDTO.TotalScoreThrown;
            leaderboardRowDTO.PercentageSixties = playerDataDTO.TotalNumberDartsThrown == 0 ? 0 : playerDataDTO.NumberOfSixties / playerDataDTO.TotalNumberDartsThrown;

            // return
            return leaderboardRowDTO;
        }

        /// <summary>
        /// Fill a new game status DTO
        /// </summary>
        /// <param name="game">The given game</param>
        /// <param name="gameStatus">the given game status</param>
        /// <returns>The game status (DTO format)</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public StatusDTO FillStatusDTO(Game game, int gameStatus)
        {
            // variables
            StatusDTO statusDTO = new StatusDTO();
            Boolean turnEndedForCurrentPlayer = gameStatus > 2;

            // fills
            statusDTO.Status = turnEndedForCurrentPlayer ? gameStatus / 2 : gameStatus;
            statusDTO.gameDTO = new GameDetailsDTO(game);
            if (turnEndedForCurrentPlayer)
                statusDTO.gameDTO.Game.LegGroups.Last().GoNextPlayerLeg();

            // return
            return statusDTO;
        } 
        #endregion

    }
} 
