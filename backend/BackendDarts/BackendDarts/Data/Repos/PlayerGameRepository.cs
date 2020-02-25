using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Domain;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos
{
    public class PlayerGameRepository: IPlayerGameRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<PlayerGame> _playerGames;
        public PlayerGameRepository(ApplicationDbContext context)
        {
            _context = context;
            _playerGames = context.PlayerGames;
        }

        public void Add(PlayerGame playerGame)
        {
            _playerGames.Add(playerGame);
        }

        public void Delete(PlayerGame playerGame)
        {

            _playerGames.Remove(playerGame);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<PlayerGame> GetAll()
        {
            return _playerGames.Include(pg => pg.Legs).ThenInclude(pg => pg.Throws).ToList();
        }

        public PlayerGame GetBy(int id)
        {
            return _playerGames.SingleOrDefault(a => a.Id == id);
        }

        public void Update(PlayerGame player)
        {
            _playerGames.Update(player);
        }
    }
}
