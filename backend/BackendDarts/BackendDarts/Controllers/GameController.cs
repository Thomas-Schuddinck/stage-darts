using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.domein;
using BackendDarts.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDarts.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameRepository _gameRepository;

        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpGet]
        public IEnumerable<Game> GetAll()
        {
            return _gameRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Game> GetBy(int id)
        {
            Game a = _gameRepository.GetBy(id);
            if (a == null) return NoContent();
            return a;
        }

        [HttpPost]
        public ActionResult<Game> Post()
        {
            
                Game a = new Game();
            _gameRepository.Add(a);
            _gameRepository.SaveChanges();
                return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        // PUT: api/Afbeelding/5
        //[HttpPut("{id}")]
        //public ActionResult<Game> Put()
        //{
          

        //}

        [HttpDelete("{id}")]
        public ActionResult<Game> Delete(int id)
        {
            Game game = _gameRepository.GetBy(id);
            _gameRepository.Delete(game);
            _gameRepository.SaveChanges();
            return game;
        }
    }
}