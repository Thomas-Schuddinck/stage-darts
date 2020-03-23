using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.Data.Repos.IRepos;
using BackendDarts.DTOs;
using BackendDarts.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDarts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerGameController : ControllerBase
    {
        private IPlayerLegRepository _playerGameRepository;

        public PlayerGameController(IPlayerLegRepository playerGameRepository)
        {
            _playerGameRepository = playerGameRepository;
        }

        [HttpGet]
        public IEnumerable<PlayerLegDTO> GetAll()
        {
            return _playerGameRepository.GetAll().Select(pg => new PlayerLegDTO(pg)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerLegDTO> GetBy(int id)
        {
            PlayerLeg a = _playerGameRepository.GetBy(id);
            if (a == null) return NoContent();
            return new PlayerLegDTO(a);
        }

        [HttpPost]
        public ActionResult<PlayerLegDTO> Post()
        {

            PlayerLeg a = new PlayerLeg();
            _playerGameRepository.Add(a);
            _playerGameRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        [HttpDelete("{id}")]
        public ActionResult<PlayerLegDTO> Delete(int id)
        {
            PlayerLeg playerGame = _playerGameRepository.GetBy(id);
            _playerGameRepository.Delete(playerGame);
            _playerGameRepository.SaveChanges();
            return new PlayerLegDTO(playerGame);
        }
    }
}