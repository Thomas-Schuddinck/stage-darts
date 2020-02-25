using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.data.Repos.IRepos;
using BackendDarts.Models;
using Microsoft.AspNetCore.Http;
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
        public IEnumerable<Player> GetAll()
        {
            return _playerRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Player> GetBy(int id)
        {
            Player a = _playerRepository.GetBy(id);
            if (a == null) return NoContent();
            return a;
        }

        [HttpPost]
        public ActionResult<Player> Post(string naam)
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
        public ActionResult<Player> Delete(int id)
        {
            Player player = _playerRepository.GetBy(id);
            _playerRepository.Delete(player);
            _playerRepository.SaveChanges();
            return player;
        }
    }
}