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
        [HttpGet]
        public IEnumerable<GameDTO> GetAll()
        {
            return _gameRepository.GetAll().Select(g => new GameDTO(g)).ToList();
        }
        [HttpGet]
        [Route("/gamelist/all")]
        public IEnumerable<GameDTO> GetAllGameList()
        {
            return _gameRepository.GetAllWithPlayers().Select(g => new GameDTO(g)).ToList();
        }

        [HttpGet]
        [Route("/leaderboard")]
        public List<LeaderboardDTO> GetLeaderboard()
        {
            //map aanmaken met alle spelers in


            //leaderborddtos aanmaken per speler en in lijst steken

            var temp = 0;
            return CreateLeaderBoardDTO(MapPlayerData());

        }




        [HttpGet("{id}")]
        public ActionResult<GameDetailsDTO> GetBy(int id)
        {
            Game game = _gameRepository.GetBy(id);
            if (game == null) return NoContent();
            game.SortPlayerLegs();
            Game.StartGame(game);

            GameDetailsDTO gamedetails = new GameDetailsDTO(new GameDTO(game));
            gamedetails.Game = new GameDTO(game);
            gamedetails.CurrentPlayer = new PlayerDTO(game.PlayerGames[game.currentPlayerIndex].Player);

            return gamedetails;

        }

        [HttpPost("new-game/")]
        public ActionResult<GameDTO> Post([FromBody]NewGameDTO newGame)
        {

            Game a = new Game(newGame);
            foreach (int id in newGame.Players)

                a.AddPlayer(_playerRepository.GetBy(id));
            _gameRepository.Add(a);
            _gameRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }


        [HttpDelete("{id}")]
        public ActionResult<GameDTO> Delete(int id)
        {
            Game game = _gameRepository.GetBy(id);
            _gameRepository.Delete(game);
            _gameRepository.SaveChanges();
            return new GameDTO(game);
        }

        [HttpPut("join/{id}/{value}")]
        public ActionResult<GameDTO> AddThrow(int id, int value)
        {
            Game game = _gameRepository.GetBy(id);
            game.AddThrow(value);
            _gameRepository.SaveChanges();
            return new GameDTO(game);
        }

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

        [HttpPost("game/")]
        public ActionResult<StatusDTO> Post([FromBody]DartThrowDTO dartThrow)
        {
            Game currentGame = _gameRepository.GetBy(Game.singletonGame.Id);
            int status = HandleThrow(currentGame, dartThrow);

            StatusDTO statusDTO = FillStatusDTO(currentGame, status);
            _gameRepository.SaveChanges();
            _hubContext.Clients.All.UpdateGame(statusDTO);

            return statusDTO;
        } 
        #endregion

        #region Support Methods
        [ApiExplorerSettings(IgnoreApi = true)]
        public Dictionary<int, TempPlayerDataDTO> MapPlayerData()
        {
            Dictionary<int, TempPlayerDataDTO> templayerMap = new Dictionary<int, TempPlayerDataDTO>();
            foreach (Player player in _playerRepository.GetAll())
            {
                templayerMap.Add(player.Id, new TempPlayerDataDTO());
                templayerMap[player.Id].NumberOfSixties = 0;
                templayerMap[player.Id].NumberOfWins = 0;
                templayerMap[player.Id].TotalGamesPlayed = 0;
                templayerMap[player.Id].TotalNumberDartsThrown = 0;
                templayerMap[player.Id].TotalScoreThrown = 0;
            }
            //database doorlopen en gegevens per speler opvullen
            foreach (Game game in _gameRepository.GetAllDetailed())
            {

                foreach (LegGroup lg in game.LegGroups)
                {
                    if (lg.Winner != -1)
                    {
                        templayerMap[lg.Winner].NumberOfWins = templayerMap[lg.Winner].NumberOfWins + 1;
                    }

                    foreach (PlayerLeg pg in lg.PlayerLegs)
                    {
                        foreach (Turn turn in pg.Turns)
                        {
                            foreach (DartThrow dt in turn.Throws)
                            {
                                templayerMap[pg.Player.Id].TotalNumberDartsThrown = +1;
                                templayerMap[pg.Player.Id].TotalScoreThrown += dt.Value;
                                if (dt.Value == 60)
                                {
                                    templayerMap[pg.Player.Id].NumberOfSixties = templayerMap[pg.Player.Id].NumberOfSixties + 1;
                                }
                            }
                        }
                    }
                }
            }
            return templayerMap;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public List<LeaderboardDTO> CreateLeaderBoardDTO(Dictionary<int, TempPlayerDataDTO> templayerMap)
        {
            List<LeaderboardDTO> leaderboard = new List<LeaderboardDTO>();
            foreach (KeyValuePair<int, TempPlayerDataDTO> playerdata in templayerMap)
            {
                IEnumerable<Game> games = _playerRepository.GetAllGamesFromPlayer(playerdata.Key);
                int numberofgames = games.Count();
                LeaderboardDTO lbdto = new LeaderboardDTO();
                lbdto.NumberOfWins = playerdata.Value.NumberOfWins;
                lbdto.PercentageWins = numberofgames == 0 ? 0 : (playerdata.Value.NumberOfWins / numberofgames) * 100;
                lbdto.TotalScoreThrown = playerdata.Value.TotalScoreThrown;
                lbdto.PercentageSixties = playerdata.Value.TotalNumberDartsThrown == 0 ? 0 : playerdata.Value.NumberOfSixties / playerdata.Value.TotalNumberDartsThrown;
                Player tempplayer = _playerRepository.GetBy(playerdata.Key);
                PlayerDTO pldto = new PlayerDTO();
                pldto.Id = tempplayer.Id;
                pldto.Name = tempplayer.Name;
                lbdto.player = pldto;
                leaderboard.Add(lbdto);
            }
            return leaderboard;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public StatusDTO FillStatusDTO(Game game, int status)
        {
            StatusDTO statusDTO = new StatusDTO();
            Boolean bol = status > 2;
            statusDTO.Status = bol ? status / 2 : status;
            statusDTO.gameDTO = new GameDetailsDTO(new GameDTO(game))
            {
                CurrentPlayer = new PlayerDTO(game.PlayerGames[game.currentPlayerIndex].Player),
                NextPlayer = new PlayerDTO(game.PlayerGames[(game.currentPlayerIndex + 1) % game.PlayerGames.Count].Player)
            };
            if (bol)
                statusDTO.gameDTO.Game.LegGroups.Last().GoNextPlayerLeg();
            return statusDTO;
        }

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

        [ApiExplorerSettings(IgnoreApi = true)]
        private int HandleThrow(Game game, DartThrowDTO dartThrow)
        {
            GameDTO gameDTO = new GameDTO(game);
            PlayerLeg currentPlayerLeg = game.GetCurrenPlayerLeg();

            CheckNewTurnRequired(currentPlayerLeg, game);
            game.AddThrow(dartThrow.Value);
            Boolean bol = ValidateAllThrowsThrown(currentPlayerLeg);
            int status = StatusFase(game, game.CalculateScore(currentPlayerLeg));
            status = !bol ? status : status * 2;
            return status;


        }
        /// <summary>
        /// Checks if a new Turn should be made.
        /// If the requirements are met, a new Turn will be added to the given PlayerLeg of a given Game
        /// </summary>
        /// <param name="playerLeg">The given PlayerLeg</param>
        /// <param name="game">The gvien Game</param>
        [ApiExplorerSettings(IgnoreApi = true)]
        private void CheckNewTurnRequired(PlayerLeg playerLeg, Game game)
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
        private int StatusFase(Game game, int score)
        {
            Player currentPlayer = game.GetCurrentPlayer();
            PlayerLeg playerLeg = game.GetCurrenPlayerLeg();
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
                    game.GetCurrenLegGroup().FinishLeg(currentPlayer.Id);
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

    }
} 
#endregion