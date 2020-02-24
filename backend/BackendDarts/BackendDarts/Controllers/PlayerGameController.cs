using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.Data.Repos.IRepos;
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
        public IEnumerable<PlayerGame> GetAll()
        {
            return _playerGameRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerGame> GetBy(int id)
        {
            PlayerGame a = _playerGameRepository.GetBy(id);
            if (a == null) return NoContent();
            return a;
        }

        [HttpPost]
        public ActionResult<PlayerGame> Post()
        {

            PlayerGame a = new PlayerGame();
            _playerGameRepository.Add(a);
            _playerGameRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        [HttpDelete("{id}")]
        public ActionResult<PlayerGame> Delete(int id)
        {
            PlayerGame playerGame = _playerGameRepository.GetBy(id);
            _playerGameRepository.Delete(playerGame);
            _playerGameRepository.SaveChanges();
            return playerGame;
        }
    }
}