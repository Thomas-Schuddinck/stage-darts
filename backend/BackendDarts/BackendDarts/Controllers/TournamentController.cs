using BackendDarts.data.Repos.IRepos;
using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Domain.DTOs;
using BackendDarts.Domain.Models;
using BackendDarts.DTOs;
using BackendDarts.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private ITournamentRepository _tournamentRepository;
        private IPlayerRepository _playerRepository;
        public TournamentController(ITournamentRepository tournamentRepository, IPlayerRepository playerRepository)
        {
            _tournamentRepository = tournamentRepository;
            _playerRepository = playerRepository;
        }

        [HttpGet]
        [Route("/unfinished")]
        public IEnumerable<TournamentBasicDTO> GetAllUnfinished()
        {
            return _tournamentRepository.GetAllUnfinished().Select(tournament => new TournamentBasicDTO(tournament)).ToList();
        }

        [HttpGet]
        [Route("/finished")]
        public IEnumerable<TournamentBasicDTO> GetAllFinished()
        {
            return _tournamentRepository.GetAllFinished().Select(tournament => new TournamentBasicDTO(tournament)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<TournamentDTO> GetBy(int id)
        {
            Tournament tournament = _tournamentRepository.GetBy(id);
            if (tournament == null) return NoContent();
            return new TournamentDTO(tournament);
        }
        

        /// <summary>
        /// dit zal nog niet werken
        /// </summary>
        /// <param name="newGame"></param>
        /// <returns></returns>
        [HttpPost("new-tournament/")]
        public ActionResult<GenericCreationDTO> AddNewTournament([FromBody]GenericCreationDTO newGame)
        {

            Tournament tournament = CreateTournament(newGame);
            return CreatedAtAction(nameof(GetBy), new { id = tournament.Id }, tournament);

        }

        /// <summary>
        /// Create a new Tournament
        /// </summary>
        /// <param name="newGameDTO">The data containing the data for a new Tournament</param>
        /// <returns>The new Tournament</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        public Tournament CreateTournament(GenericCreationDTO newGameDTO)
        {
            Tournament tournament = new Tournament(newGameDTO);
            SetupTournament(new GenericAssistDTO { Body = tournament, Players = newGameDTO.Players });
            _tournamentRepository.Add(tournament);
            _tournamentRepository.SaveChanges();
            return tournament;
        }
        /// <summary>Tournament
        /// Setting up the new given Game
        /// </summary>
        /// <param name="dto">the new Tournament</param>
        [ApiExplorerSettings(IgnoreApi = true)]
        public void SetupTournament(GenericAssistDTO dto)
        {
            List<Player> tempPlayerList = new List<Player>();
            foreach (int id in dto.Players)
                tempPlayerList.Add(_playerRepository.GetBy(id));
            tempPlayerList.Shuffle();
            ((Tournament)dto.Body).SetupTournament(tempPlayerList);
        }
    }
}
