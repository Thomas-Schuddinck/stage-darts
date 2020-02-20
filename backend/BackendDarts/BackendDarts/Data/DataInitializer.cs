
using BackendDarts.Domain;
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
                Game game2 = new Game();
                Game game3 = new Game();
                _dbContext.Games.Add(game);
                _dbContext.Games.Add(game2);
                _dbContext.Games.Add(game3);

                Player player = new Player("Peter");
                Player player2 = new Player("Tom");
                Player player3 = new Player("Quinten");
                _dbContext.Players.Add(player);
                _dbContext.Players.Add(player2);
                _dbContext.Players.Add(player3);


                PlayerGame gp = new PlayerGame();
                PlayerGame gp1 = new PlayerGame();
                PlayerGame gp2= new PlayerGame();
                gp.Player = player;
                gp.Game = game;
                gp2.Player = player3;
                gp2.Game = game3;
                gp1.Player = player2;
                gp1.Game = game3;

                player.PlayerGames.Add(gp);
                player.PlayerGames.Add(gp1);
                player2.PlayerGames.Add(gp2);


                DartThrow dt = new DartThrow(13);
                DartThrow dt6 = new DartThrow(19);
                DartThrow dt5 = new DartThrow(60);
                DartThrow dt4 = new DartThrow(60);
                DartThrow dt3 = new DartThrow(20);
                DartThrow dt2 = new DartThrow(40);
                DartThrow dt1 = new DartThrow(14);
                _dbContext.DartThrows.Add(dt);
                _dbContext.DartThrows.Add(dt1);
                _dbContext.DartThrows.Add(dt2);
                _dbContext.DartThrows.Add(dt3);
                _dbContext.DartThrows.Add(dt4);
                _dbContext.DartThrows.Add(dt5);
                _dbContext.DartThrows.Add(dt6);

                Leg leg = new Leg();
                Leg leg2 = new Leg();
                Leg leg3 = new Leg();

                gp.Legs.Add(leg);
                gp.Legs.Add(leg2);
                gp.Legs.Add(leg3);

                leg.Throws.Add(dt);
                leg.Throws.Add(dt1);
                leg.Throws.Add(dt2);
                leg.Throws.Add(dt3);
                leg2.Throws.Add(dt4);
                leg3.Throws.Add(dt5);
                leg3.Throws.Add(dt6);


                _dbContext.Legs.Add(leg);
                _dbContext.Legs.Add(leg2);
                _dbContext.Legs.Add(leg3);
                _dbContext.SaveChanges();
            }
        }

    }
}
