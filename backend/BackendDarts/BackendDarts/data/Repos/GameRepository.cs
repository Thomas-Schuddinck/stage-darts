﻿using BackendDarts.data;
using BackendDarts.Domain;
using BackendDarts.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Repos
{
    public class GameRepository: IGameRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Game> _games;
        public GameRepository(ApplicationDbContext context)
        {
            _context = context;
            _games = context.Games;
        }

        public void Add(Game game)
        {
            _games.Add(game);
        }

        public void Delete(Game game)
        {

            _games.Remove(game);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Game> GetAll()
        {
            return _games.ToList();
        }
        public IEnumerable<Game> GetAllWithPlayers()
        {
            return _games.Include(p => p.PlayerGames).ThenInclude(pg => pg.Player).Include(p => p.LegGroups).ToList();
        }
        public IEnumerable<Game> GetAllDetailed()
        {
            return _games.Include(p => p.LegGroups).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Turns).ThenInclude(t => t.Throws)
                .Include(p => p.PlayerGames).ThenInclude(pg => pg.Player)
                .Include(p => p.CurrentLegGroup).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Turns).ThenInclude(t => t.Throws)
                .ToList();
        }
        public Game GetBy(int id)
        {
            return _games
                .Include(p => p.LegGroups).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Turns).ThenInclude(t => t.Throws)
                .Include(p => p.PlayerGames).ThenInclude(pg => pg.Player)
                .Include(p => p.CurrentLegGroup).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Turns).ThenInclude(t => t.Throws)
                .Include(p => p.Tournament).ThenInclude(t => t.PlayerTournaments)
                .Include(p => p.Tournament).ThenInclude(t=> t.Games).ThenInclude(g => g.PlayerGames).ThenInclude(pg => pg.Player)
                .Include(p => p.Tournament).ThenInclude(t => t.Games).ThenInclude(g => g.CurrentLegGroup).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Player)
                .SingleOrDefault(a => a.Id == id);
        }

        public void Update(Game game)
        {
            _games.Update(game);
        }

        public IEnumerable<Game> GetAllDetailedRanked()
        {
            return _games.Include(p => p.LegGroups).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Turns).ThenInclude(t => t.Throws)
                .Include(p => p.PlayerGames).ThenInclude(pg => pg.Player)
                .Include(p => p.CurrentLegGroup).ThenInclude(lg => lg.PlayerLegs).ThenInclude(pl => pl.Turns).ThenInclude(t => t.Throws)
                .Where(g => g.Type == 2)
                .ToList();
        }
    }
}
