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
            PlayerDTO dto = new PlayerDTO();
            dto.Id = id;
            dto.Name = a.Name;
            return dto;
        }

        [HttpGet("stats/{id}")]
        public ActionResult<PlayerStatsDTO> GetStats(int id)
        {
            Player a = _playerRepository.GetBy(id);
            if (a == null) return NoContent();
            IEnumerable<Game> games = _playerRepository.GetAllGamesFromPlayer(id);
            ICollection<PlayerGame> playergames = new List<PlayerGame>();
            int numOfWins = 0;
            int totalScore = 0;
            int totalThrows = 0;
            int numOfSixty = 0;
            int numOfMisses = 0;
            foreach (Game game in games)
            {
                foreach(PlayerGame pg in game.PlayerGames)
                {

                    playergames.Add(pg);
                    foreach(Leg leg in pg.Legs)
                    {
                        foreach(DartThrow dt in leg.Throws)
                        {
                            totalScore += dt.Value;
                            totalThrows += 1;
                            if(dt.Value == 60)
                            {
                                numOfSixty += 1;
                            }
                            if(dt.Value == 0)
                            {
                                numOfMisses += 1;
                            }
                        }
                    }
                }
                if(game.Winner == id)
                {
                    numOfWins += 1;
                }
            }

            double percentageSixty = (numOfSixty/totalThrows)*100;
            double averageThrow = totalThrows / totalThrows;
            double percentageWins = (numOfWins / games.Count()) * 100;
            double percentageBoardHits = 100-((numOfMisses / totalThrows) * 100);

            PlayerStatsDTO dto = new PlayerStatsDTO();
            dto.NumberOfWins = numOfWins;
            dto.NumberOfMisses = numOfMisses;
            dto.NumberOfSixties = numOfMisses;
            dto.TotalScoreThrown = totalScore;
            dto.TotalNumberDartsThrown = totalThrows;
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