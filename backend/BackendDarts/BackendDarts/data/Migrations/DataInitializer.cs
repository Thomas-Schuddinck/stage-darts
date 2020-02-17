using BackendDarts.domein;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data
{

    public class DataInitializer
    {
        private ApplicationDbContext _dbContext;

        public List<Game> games;

        public DataInitializer(ApplicationDbContext dbContext, IGameRepository gameRepo)
        {
            _dbContext = dbContext;
            games = new List<Game>();
        }

        public async Task InitializeData()
        {
            _dbContext.Database.EnsureDeleted();

            if (_dbContext.Database.EnsureCreated())
            {
                Game game = new Game();
                _dbContext.Games.Add(game);

                Player player = new Player("Peter");
                _dbContext.Players.Add(player);

                DartThrow dt = new DartThrow(13);
                _dbContext.DartThrows.Add(dt);

                //Leg leg = new Leg();
                //leg.Throws.Add(dt);


                _dbContext.SaveChanges();
            }
        }

    }
}
