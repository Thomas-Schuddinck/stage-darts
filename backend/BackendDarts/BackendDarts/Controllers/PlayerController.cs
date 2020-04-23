using System.Collections.Generic;
using System.Linq;
using BackendDarts.data.Repos.IRepos;
using BackendDarts.Models;
using BackendDarts.DTOs;
using Microsoft.AspNetCore.Mvc;
using BackendDarts.Domain.DTOs;

namespace BackendDarts.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private IPlayerRepository _playerRepository;

        public PlayerController(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        [HttpGet]
        public IEnumerable<PlayerDTO> GetAll()
        {
            return _playerRepository.GetAll().Select(player => new PlayerDTO(player)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerDTO> GetBy(int id)
        {
            Player player = _playerRepository.GetBy(id);
            if (player == null) return NoContent();
            return new PlayerDTO(player);
        }

        [HttpGet("stats/{id}")]
        public ActionResult<PlayerStatsDTO> GetStats(int id)
        {
            Player player = _playerRepository.GetBy(id);
            if (player == null) return NoContent();
            IEnumerable<Game> games = _playerRepository.GetAllGamesFromPlayer(id);
            ICollection<PlayerLeg> playergames = new List<PlayerLeg>();
            double numOfWins = 0;
            double totalScore = 0;
            double totalThrows = 0;
            double numOfSixty = 0;
            double numOfMisses = 0;
            foreach (Game game in games)
            {
                foreach (LegGroup legGroup in game.LegGroups)
                {
                    if (legGroup.PlayerLegs.SingleOrDefault(pl => pl.Player != null && pl.Player.Id == id) != null)
                    {
                        PlayerLeg playerLeg = legGroup.PlayerLegs.SingleOrDefault(pl => pl.Player != null && pl.Player.Id == id);
                        playergames.Add(playerLeg);
                        foreach (Turn turn in playerLeg.Turns)
                        {
                            foreach (DartThrow dartThrow in turn.Throws)
                            {
                                totalScore += dartThrow.Value;
                                totalThrows += 1;
                                if (dartThrow.Value == 60)
                                {
                                    numOfSixty += 1;
                                }
                                if (dartThrow.Value == 0)
                                {
                                    numOfMisses += 1;
                                }
                            }
                        }
                    }
                }
                if (game.Winner == id)
                {
                    numOfWins += 1;
                }
            }

            double percentageSixty = totalThrows == 0 ? 0 : numOfSixty/ totalThrows * 100;
            double averageThrow = totalThrows == 0 ? 0 : totalScore / totalThrows;
            double percentageWins = games.Count() == 0 ? 0 : (numOfWins / games.Count()) * 100;
            double percentageBoardHits = totalThrows == 0 ? 0 : 100 - ((numOfMisses / totalThrows) * 100);
            
            PlayerStatsDTO playerStatsDTO = new PlayerStatsDTO();
            playerStatsDTO.NumberOfWins = (int)numOfWins;
            playerStatsDTO.NumberOfMisses = (int)numOfMisses;
            playerStatsDTO.NumberOfSixties = (int)numOfSixty;
            playerStatsDTO.TotalScoreThrown = (int)totalScore;
            playerStatsDTO.TotalNumberDartsThrown = (int)totalThrows;
            playerStatsDTO.PercentageSixties = percentageSixty;
            playerStatsDTO.AverageScoreThrown = averageThrow;
            playerStatsDTO.PercentageWins = percentageWins;
            playerStatsDTO.PercentageBoardHits = percentageBoardHits;
            playerStatsDTO.History = games.Where(g => (g.Winner != -1 && g.Type != 3)).Select(game => new GameDTO(game)).ToList();
            return playerStatsDTO;
        }

        [HttpPost]
        public ActionResult<PlayerDTO> Post([FromBody]NewPlayerDTO newPlayer)
        {

            Player player = new Player(newPlayer);
            _playerRepository.Add(player);
            _playerRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = player.Id }, player);

        }

        [HttpDelete("{id}")]
        public ActionResult<PlayerDTO> Delete(int id)
        {
            Player player = _playerRepository.GetBy(id);
            _playerRepository.Delete(player);
            _playerRepository.SaveChanges();
            PlayerDTO playerDTO = new PlayerDTO();
            playerDTO.Id = id;
            playerDTO.Name = player.Name;
            return playerDTO;
        }

        [HttpPut("{id}")]
        public ActionResult UpdatePlayer(int id, [FromBody]NewPlayerDTO newPlayer)
        {
            Player player = _playerRepository.GetAll().SingleOrDefault(p => p.Id == id);
            player.Email = newPlayer.Email;
            player.FirstName = newPlayer.FirstName;
            player.LastName = newPlayer.LastName;
            _playerRepository.SaveChanges();

            return NoContent();
        }
    }
}