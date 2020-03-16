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

            //leaderborddtos aanmaken per speler en in lijst steken
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
            var temp = 0;
            return leaderboard;

        }

        [HttpGet("{id}")]
        public ActionResult<GameDetailsDTO> GetBy(int id)
        {
            Game game = _gameRepository.GetBy(id);
            if (game == null) return NoContent();

            Game.StartGame(game);

            GameDetailsDTO gamedetails = new GameDetailsDTO(new GameDTO(game));
            gamedetails.Game = new GameDTO(game);
            gamedetails.CurrentPlayer = new PlayerDTO(game.PlayerGames[game.currentPlayerIndex].Player);

            return gamedetails;

        }

        //[HttpPost]
        //public ActionResult<GameDTO> Post()
        //{

        //    Game a = new Game();
        //    _gameRepository.Add(a);
        //    _gameRepository.SaveChanges();
        //    return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        //}


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

            Game hulpgame = _gameRepository.GetBy(Game.singletonGame.Id);


            StatusDTO statusDTO = new StatusDTO();
            int status = 0;
            //STATUS
            //1: ADDTHROW
            //2: NEW TURN
            //3: NEW LEG
            //4: END GAME

            GameDTO gmdto = new GameDTO(hulpgame);
            PlayerLeg currentPlayerLeg = hulpgame.GetCurrenPlayerLeg();
            Player currentPlayer = hulpgame.PlayerGames[hulpgame.currentPlayerIndex].Player;


            //laatste turn in beurt eindig turn
            if (currentPlayerLeg.Turns[currentPlayerLeg.Turns.Count - 1].IsFinished)
            {
                hulpgame.CreateNextTurn();
                statusDTO.Status = 2;
            }
            else
            {

                statusDTO.Status = 1;
            }
            hulpgame.AddThrow(dartThrow.Value);
            if (currentPlayerLeg.Turns[currentPlayerLeg.Turns.Count - 1].Throws.Count >= 3)
            {
                currentPlayerLeg.Turns[currentPlayerLeg.Turns.Count - 1].EndTurn();
            }
            int score = hulpgame.CalculateScore(currentPlayerLeg);
            if (score == 501)
            {
                //indien 3de leg gewonnen eindig game
                if (gmdto.Players.SingleOrDefault(p => p.PlayerDTO.Id == currentPlayer.Id).LegsWon == 3)
                {
                    hulpgame.Winner = currentPlayer.Id;
                    statusDTO.Status = 4;
                }
                //indien geen 3 legs maar wel uigespeeld eindig leg
                else
                {
                    hulpgame.EndLeg();
                    statusDTO.Status = 3;
                }
            }
            else
            {
                if (score > 501)
                {
                    currentPlayerLeg.Turns[currentPlayerLeg.Turns.Count - 1].IgnoreAndEndTurn();

                }



            }

            

            statusDTO.gameDTO = new GameDetailsDTO(new GameDTO(hulpgame));
            statusDTO.gameDTO.CurrentPlayer = new PlayerDTO(hulpgame.PlayerGames[hulpgame.currentPlayerIndex].Player);
            _gameRepository.SaveChanges();
            _hubContext.Clients.All.UpdateGame(statusDTO);

            return statusDTO;
        }

    }
}