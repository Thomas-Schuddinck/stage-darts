using System;
using System.Collections.Generic;
using System.Linq;
using BackendDarts.data.Repos.IRepos;
using BackendDarts.DTOs;
using BackendDarts.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendDarts.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameRepository _gameRepository;
        private IPlayerRepository _playerRepository;

        public GameController(IGameRepository gameRepository, IPlayerRepository playerRepository)
        {
            _gameRepository = gameRepository;
            _playerRepository = playerRepository;
        }

        [HttpGet]
        public IEnumerable<GameDTO> GetAll()
        {
            return _gameRepository.GetAll().Select(g => new GameDTO(g)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<GameDTO> GetBy(int id)
        {
            Game a = _gameRepository.GetBy(id);
            if (a == null) return NoContent();
            return new GameDTO(a);
        }

        [HttpPost]
        public ActionResult<GameDTO> Post()
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
            foreach(PlayerGame pg in game.PlayerGames)
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
    }
}