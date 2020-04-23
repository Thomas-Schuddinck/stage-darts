using BackendDarts.data.Repos.IRepos;
using BackendDarts.Domain;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Repos
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Player> _players;
        private readonly DbSet<Game> _games;
        public PlayerRepository(ApplicationDbContext context)
        {
            _context = context;
            _players = context.Players;
            _games = context.Games;
        }

        public void Add(Player player)
        {
            _players.Add(player);
        }

        public void Delete(Player player)
        {

            _players.Remove(player);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Player> GetAll()
        {
            return _players.ToList();
        }

        public Player GetBy(int id)
        {
            return _players.SingleOrDefault(a => a.Id == id);
        }

        public void Update(Player player)
        {
            _players.Update(player);
        }

        public IEnumerable<Game> GetAllGamesSimpleFromPlayer(int id)
        {
            return _games
                .Where(g => g.PlayerGames.Any(pg => pg.PlayerId == id))
                .ToList();
        }

        public IEnumerable<Game> GetAllGamesFromPlayer(int id)
        {
            return _games
                .Where(g => g.PlayerGames.Any(pg => pg.PlayerId == id)).Include(g => g.PlayerGames).ThenInclude(pg => pg.Player)
                .Include(g => g.LegGroups).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pg => pg.Turns).ThenInclude(l => l.Throws)
                .ToList();
        }
    }
}
