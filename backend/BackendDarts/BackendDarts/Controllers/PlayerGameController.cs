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
        private IPlayerGameRepository _playerGameRepository;

        public PlayerGameController(IPlayerGameRepository playerGameRepository)
        {
            _playerGameRepository = playerGameRepository;
        }

        [HttpGet]
        public IEnumerable<PlayerGameDTO> GetAll()
        {
            return _playerGameRepository.GetAll().Select(pg => new PlayerGameDTO(pg)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerGameDTO> GetBy(int id)
        {
            PlayerGame a = _playerGameRepository.GetBy(id);
            if (a == null) return NoContent();
            return new PlayerGameDTO(a);
        }

        [HttpPost]
        public ActionResult<PlayerGameDTO> Post()
        {

            PlayerGame a = new PlayerGame();
            _playerGameRepository.Add(a);
            _playerGameRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        [HttpDelete("{id}")]
        public ActionResult<PlayerGameDTO> Delete(int id)
        {
            PlayerGame playerGame = _playerGameRepository.GetBy(id);
            _playerGameRepository.Delete(playerGame);
            _playerGameRepository.SaveChanges();
            return new PlayerGameDTO(playerGame);
        }
    }
}