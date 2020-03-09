using System.Collections.Generic;
using System.Linq;
using BackendDarts.data.Repos.IRepos;
using BackendDarts.Models;
using BackendDarts.DTOs;
using Microsoft.AspNetCore.Mvc;

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
            return _playerRepository.GetAll().Select(p => new PlayerDTO(p)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerDTO> GetBy(int id)
        {
            Player a = _playerRepository.GetBy(id);
            if (a == null) return NoContent();
            return new PlayerDTO(a);
        }

        [HttpGet("stats/{id}")]
        public ActionResult<PlayerStatsDTO> GetStats(int id)
        {
            Player a = _playerRepository.GetBy(id);
            if (a == null) return NoContent();
            IEnumerable<Game> games = _playerRepository.GetAllGamesFromPlayer(id);
            ICollection<PlayerLeg> playergames = new List<PlayerLeg>();
            double numOfWins = 0;
            double totalScore = 0;
            double totalThrows = 0;
            double numOfSixty = 0;
            double numOfMisses = 0;
            foreach (Game game in games)
            {
                foreach (LegGroup lg in game.LegGroups)
                {
                    foreach (PlayerLeg pg in lg.PlayerLegs)
                    {

                        playergames.Add(pg);
                        foreach (Turn turn in pg.Turns)
                        {
                            foreach (DartThrow dt in turn.Throws)
                            {
                                totalScore += dt.Value;
                                totalThrows += 1;
                                if (dt.Value == 60)
                                {
                                    numOfSixty += 1;
                                }
                                if (dt.Value == 0)
                                {
                                    numOfMisses += 1;
                                }
                            }
                        }
                    }
                    if (game.Winner == id)
                    {
                        numOfWins += 1;
                    }
                }
            }

            double percentageSixty = totalThrows == 0 ? 0 : numOfSixty/ totalThrows;
            double averageThrow = totalThrows == 0 ? 0 : totalScore / totalThrows;
            double percentageWins = games.Count() == 0 ? 0 : (numOfWins / games.Count()) * 100;
            double percentageBoardHits = totalThrows == 0 ? 0 : 100 - ((numOfMisses / totalThrows) * 100);

            PlayerStatsDTO dto = new PlayerStatsDTO();
            dto.NumberOfWins = (int)numOfWins;
            dto.NumberOfMisses = (int)numOfMisses;
            dto.NumberOfSixties = (int)numOfSixty;
            dto.TotalScoreThrown = (int)totalScore;
            dto.TotalNumberDartsThrown = (int)totalThrows;
            dto.PercentageSixties = percentageSixty;
            dto.AverageScoreThrown = averageThrow;
            dto.PercentageWins = percentageWins;
            dto.PercentageBoardHits = percentageBoardHits;
            return dto;
        }

        [HttpPost]
        public ActionResult<PlayerDTO> Post(string naam)
        {

            Player a = new Player(naam);
            _playerRepository.Add(a);
            _playerRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        // PUT: api/Afbeelding/5
        //[HttpPut("{id}")]
        //public ActionResult<Player> Put()
        //{


        //}

        [HttpDelete("{id}")]
        public ActionResult<PlayerDTO> Delete(int id)
        {
            Player player = _playerRepository.GetBy(id);
            _playerRepository.Delete(player);
            _playerRepository.SaveChanges();
            PlayerDTO DTO = new PlayerDTO();
            DTO.Id = id;
            DTO.Name = player.Name;
            return DTO;
        }
    }
}