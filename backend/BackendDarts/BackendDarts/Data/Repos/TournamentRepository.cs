using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Domain;
using BackendDarts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos
{
    public class TournamentRepository : ITournamentRepository
    {

        private readonly ApplicationDbContext _context;
        private readonly DbSet<Tournament> _tournaments;
        public TournamentRepository(ApplicationDbContext context)
        {
            _context = context;
            _tournaments = context.Tournaments;
        }
        public void Add(Tournament tournament)
        {
            _tournaments.Add(tournament);
        }

        public void Delete(Tournament tournament)
        {
            _tournaments.Remove(tournament);
        }

        public IEnumerable<Tournament> GetAll()
        {
            return _tournaments
                .Include(t => t.PlayerTournaments).ThenInclude(pt => pt.Player)
                .ToList();
        }

        public Tournament GetBy(int id)
        {
            return _tournaments
                .Include(t => t.Games)
                .Include(t => t.PlayerTournaments).ThenInclude(pt => pt.Player)
                .SingleOrDefault(t => t.Id == id);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(Tournament tournament)
        {
            _tournaments.Update(tournament);
        }
    }
}
