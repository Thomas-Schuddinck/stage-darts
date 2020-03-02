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
    public class PlayerLegRepository: IPlayerLegRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<PlayerLeg> _playerGames;
        public PlayerLegRepository(ApplicationDbContext context)
        {
            _context = context;
            _playerGames = context.PlayerLegs;
        }

        public void Add(PlayerLeg playerGame)
        {
            _playerGames.Add(playerGame);
        }

        public void Delete(PlayerLeg playerGame)
        {

            _playerGames.Remove(playerGame);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<PlayerLeg> GetAll()
        {
            return _playerGames.Include(pg => pg.Turns).ThenInclude(pg => pg.Throws).ToList();
        }

        public PlayerLeg GetBy(int id)
        {
            return _playerGames.SingleOrDefault(a => a.Id == id);
        }

        public void Update(PlayerLeg player)
        {
            _playerGames.Update(player);
        }
    }
}
