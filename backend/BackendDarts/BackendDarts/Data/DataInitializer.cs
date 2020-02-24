
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
                //adding games
                Game game1 = new Game();
                Game game2 = new Game();
                Game game3 = new Game();
                _dbContext.Games.Add(game1);
                _dbContext.Games.Add(game2);
                _dbContext.Games.Add(game3);


                //adding players
                Player player1 = new Player("Peter");
                Player player2 = new Player("Tom");
                Player player3 = new Player("Quinten");
                _dbContext.Players.Add(player1);
                _dbContext.Players.Add(player2);
                _dbContext.Players.Add(player3);

                //adding playergames
                PlayerGame gp00 = new PlayerGame();
                PlayerGame gp01 = new PlayerGame();
                PlayerGame gp02= new PlayerGame();

                PlayerGame gp10 = new PlayerGame();
                PlayerGame gp11 = new PlayerGame();
                PlayerGame gp12 = new PlayerGame();
                PlayerGame gp13 = new PlayerGame();

                PlayerGame gp20 = new PlayerGame();
                PlayerGame gp21 = new PlayerGame();
                PlayerGame gp22 = new PlayerGame();
                PlayerGame gp23 = new PlayerGame();
                PlayerGame gp24 = new PlayerGame();
                PlayerGame gp25 = new PlayerGame();

                //adding players to playergames
                gp00.Player = player1;
                gp01.Player = player2;
                gp02.Player = player3;

                gp10.Player = player1;
                gp11.Player = player2;
                gp12.Player = player1;
                gp13.Player = player2;

                gp20.Player = player1;
                gp21.Player = player2;
                gp22.Player = player1;
                gp23.Player = player2;
                gp24.Player = player1;
                gp25.Player = player2;


                //adding playergames to games
                game1.PlayerGames.Add(gp00);
                game1.PlayerGames.Add(gp01);
                game1.PlayerGames.Add(gp02);

                game2.PlayerGames.Add(gp10);
                game2.PlayerGames.Add(gp11);
                game2.PlayerGames.Add(gp12);
                game2.PlayerGames.Add(gp13);

                game3.PlayerGames.Add(gp20);
                game3.PlayerGames.Add(gp21);
                game3.PlayerGames.Add(gp22);
                game3.PlayerGames.Add(gp23);
                game3.PlayerGames.Add(gp24);
                game3.PlayerGames.Add(gp25);
                
                //adding dartthrows
                DartThrow dt1 = new DartThrow(13);
                DartThrow dt2 = new DartThrow(19);
                DartThrow dt3 = new DartThrow(60);

                DartThrow dt4 = new DartThrow(60);
                DartThrow dt5 = new DartThrow(20);
                DartThrow dt6 = new DartThrow(40);

                DartThrow dt7 = new DartThrow(14);
                DartThrow dt8 = new DartThrow(1);
                DartThrow dt9 = new DartThrow(9);

                DartThrow dt10 = new DartThrow(30);
                DartThrow dt11 = new DartThrow(6);
                DartThrow dt12 = new DartThrow(2);

                DartThrow dt13 = new DartThrow(4);
                DartThrow dt14 = new DartThrow(54);
                DartThrow dt15 = new DartThrow(5);
                
                DartThrow dt16 = new DartThrow(30);
                DartThrow dt17 = new DartThrow(64);
                DartThrow dt18 = new DartThrow(28);

                DartThrow dt19 = new DartThrow(4);
                DartThrow dt20 = new DartThrow(54);
                DartThrow dt21 = new DartThrow(130);

                DartThrow dt22 = new DartThrow(29);
                DartThrow dt23 = new DartThrow(60);
                DartThrow dt24 = new DartThrow(40);

                DartThrow dt25 = new DartThrow(20);
                DartThrow dt26 = new DartThrow(40);
                DartThrow dt27 = new DartThrow(14);

                DartThrow dt28 = new DartThrow(3);
                DartThrow dt29 = new DartThrow(94);
                DartThrow dt30 = new DartThrow(55);

                _dbContext.DartThrows.Add(dt1);
                _dbContext.DartThrows.Add(dt2);
                _dbContext.DartThrows.Add(dt3);
                _dbContext.DartThrows.Add(dt4);
                _dbContext.DartThrows.Add(dt5);
                _dbContext.DartThrows.Add(dt6);
                _dbContext.DartThrows.Add(dt7);
                _dbContext.DartThrows.Add(dt8);
                _dbContext.DartThrows.Add(dt9);
                _dbContext.DartThrows.Add(dt10);
                _dbContext.DartThrows.Add(dt11);
                _dbContext.DartThrows.Add(dt12);
                _dbContext.DartThrows.Add(dt13);
                _dbContext.DartThrows.Add(dt14);
                _dbContext.DartThrows.Add(dt15);
                _dbContext.DartThrows.Add(dt16);
                _dbContext.DartThrows.Add(dt17);
                _dbContext.DartThrows.Add(dt18);
                _dbContext.DartThrows.Add(dt19);
                _dbContext.DartThrows.Add(dt20);
                _dbContext.DartThrows.Add(dt21);
                _dbContext.DartThrows.Add(dt22);
                _dbContext.DartThrows.Add(dt23);
                _dbContext.DartThrows.Add(dt24);
                _dbContext.DartThrows.Add(dt25);
                _dbContext.DartThrows.Add(dt26);
                _dbContext.DartThrows.Add(dt27);
                _dbContext.DartThrows.Add(dt28);
                _dbContext.DartThrows.Add(dt29);
                _dbContext.DartThrows.Add(dt30);

                Leg leg1 = new Leg();
                Leg leg2 = new Leg();
                Leg leg3 = new Leg();
                Leg leg4 = new Leg();
                Leg leg5 = new Leg();
                Leg leg6 = new Leg();
                Leg leg7 = new Leg();
                Leg leg8 = new Leg();
                Leg leg9 = new Leg();
                Leg leg10 = new Leg();

                gp20.Legs.Add(leg1);
                gp21.Legs.Add(leg2);
                gp22.Legs.Add(leg3);
                gp23.Legs.Add(leg4);
                gp24.Legs.Add(leg5);
                gp25.Legs.Add(leg6);
                gp10.Legs.Add(leg7);
                gp11.Legs.Add(leg8);
                gp12.Legs.Add(leg9);
                gp13.Legs.Add(leg10);

                leg1.Throws.Add(dt1);
                leg1.Throws.Add(dt2);
                leg1.Throws.Add(dt3);
                leg1.Throws.Add(dt4);
                leg1.Throws.Add(dt5);
                leg1.Throws.Add(dt6);
                leg1.Throws.Add(dt7);
                leg1.Throws.Add(dt8);
                leg1.Throws.Add(dt9);
                leg1.Throws.Add(dt10);
                leg2.Throws.Add(dt11);
                leg2.Throws.Add(dt12);
                leg2.Throws.Add(dt13);
                leg2.Throws.Add(dt14);
                leg3.Throws.Add(dt15);
                leg3.Throws.Add(dt16);
                leg3.Throws.Add(dt17);
                leg3.Throws.Add(dt18);
                leg4.Throws.Add(dt19);
                leg4.Throws.Add(dt20);
                leg4.Throws.Add(dt21);
                leg4.Throws.Add(dt22);
                leg5.Throws.Add(dt23);
                leg5.Throws.Add(dt24);
                leg5.Throws.Add(dt25);
                leg5.Throws.Add(dt26);
                leg6.Throws.Add(dt27);
                leg6.Throws.Add(dt28);
                leg6.Throws.Add(dt29);
                leg6.Throws.Add(dt30);

                _dbContext.Legs.Add(leg1);
                _dbContext.Legs.Add(leg2);
                _dbContext.Legs.Add(leg3);
                _dbContext.Legs.Add(leg4);
                _dbContext.Legs.Add(leg5);
                _dbContext.Legs.Add(leg6);
                _dbContext.Legs.Add(leg7);
                _dbContext.Legs.Add(leg8);
                _dbContext.Legs.Add(leg9);
                _dbContext.Legs.Add(leg10);
                _dbContext.SaveChanges();
            }
        }

    }
}
