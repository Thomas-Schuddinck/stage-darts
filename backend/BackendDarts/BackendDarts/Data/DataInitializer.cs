
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


        public DataInitializer(ApplicationDbContext dbContext, IGameRepository gameRepo)
        {
            _dbContext = dbContext;
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
                Player player1 = new Player("Thomas", "Schuddinck", "thomas.schuddinck@realdolmen.com");
                Player player2 = new Player("Wouter", "Opsommer", "wouter.opsommer@realdolmen.com");
                Player player3 = new Player("Johan", "Van Schoor", "johan.vanschoor@hogent.be");
                _dbContext.Players.Add(player1);
                _dbContext.Players.Add(player2);
                _dbContext.Players.Add(player3);

                //adding leggroups
                LegGroup lg1 = new LegGroup();
                LegGroup lg2 = new LegGroup();
                LegGroup lg3 = new LegGroup();
                LegGroup lg4 = new LegGroup();
                LegGroup lg5 = new LegGroup();
                LegGroup lg6 = new LegGroup();

                _dbContext.LegGroups.Add(lg1);
                _dbContext.LegGroups.Add(lg2);
                _dbContext.LegGroups.Add(lg3);
                _dbContext.LegGroups.Add(lg4);
                _dbContext.LegGroups.Add(lg5);
                _dbContext.LegGroups.Add(lg6);
                _dbContext.SaveChanges();

                //adding playerlegs
                PlayerLeg gp00 = new PlayerLeg();
                PlayerLeg gp01 = new PlayerLeg();
                PlayerLeg gp02 = new PlayerLeg();

                PlayerLeg gp10 = new PlayerLeg();
                PlayerLeg gp11 = new PlayerLeg();
                PlayerLeg gp12 = new PlayerLeg();
                PlayerLeg gp13 = new PlayerLeg();

                PlayerLeg gp20 = new PlayerLeg();
                PlayerLeg gp21 = new PlayerLeg();
                PlayerLeg gp22 = new PlayerLeg();
                PlayerLeg gp23 = new PlayerLeg();
                PlayerLeg gp24 = new PlayerLeg();
                PlayerLeg gp25 = new PlayerLeg();

                _dbContext.PlayerLegs.Add(gp00);
                _dbContext.PlayerLegs.Add(gp01);
                _dbContext.PlayerLegs.Add(gp02);
                _dbContext.PlayerLegs.Add(gp10);
                _dbContext.PlayerLegs.Add(gp11);
                _dbContext.PlayerLegs.Add(gp12);
                _dbContext.PlayerLegs.Add(gp13);
                _dbContext.PlayerLegs.Add(gp20);
                _dbContext.PlayerLegs.Add(gp21);
                _dbContext.PlayerLegs.Add(gp22);
                _dbContext.PlayerLegs.Add(gp23); 
                _dbContext.PlayerLegs.Add(gp24);
                _dbContext.PlayerLegs.Add(gp25);
                _dbContext.SaveChanges();


                //adding players to playerlegs
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

                //adding playerlegs to legGroups
                lg1.PlayerLegs.Add(gp00);
                lg1.PlayerLegs.Add(gp01);
                lg1.PlayerLegs.Add(gp02);

                lg2.PlayerLegs.Add(gp10);
                lg2.PlayerLegs.Add(gp11);
                lg3.PlayerLegs.Add(gp12);
                lg3.PlayerLegs.Add(gp13);

                lg4.PlayerLegs.Add(gp20);
                lg4.PlayerLegs.Add(gp21);
                lg5.PlayerLegs.Add(gp22);
                lg5.PlayerLegs.Add(gp23);
                lg6.PlayerLegs.Add(gp24);
                lg6.PlayerLegs.Add(gp25);

                //adding leggroups to games
                lg1.Legnr = 1;
                lg2.Legnr = 1;
                lg3.Legnr = 2;
                lg4.Legnr = 1;
                lg5.Legnr = 2;
                lg6.Legnr = 3;
                game1.LegGroups.Add(lg1);

                game2.LegGroups.Add(lg2);
                game2.LegGroups.Add(lg3);

                game3.LegGroups.Add(lg4);
                game3.LegGroups.Add(lg5);
                game3.LegGroups.Add(lg6);

                //adding players to games
                game1.AddPlayer(player1);
                game1.AddPlayer(player2);
                game1.AddPlayer(player3);

                game2.AddPlayer(player1);
                game2.AddPlayer(player2);


                game3.AddPlayer(player1);
                game3.AddPlayer(player2);
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

                DartThrow dt10 = new DartThrow(0);
                DartThrow dt11 = new DartThrow(0);
                DartThrow dt12 = new DartThrow(0);

                DartThrow dt13 = new DartThrow(4);
                DartThrow dt14 = new DartThrow(54);
                DartThrow dt15 = new DartThrow(5);
                
                DartThrow dt16 = new DartThrow(30);
                DartThrow dt17 = new DartThrow(64);
                DartThrow dt18 = new DartThrow(28);

                DartThrow dt19 = new DartThrow(4);
                DartThrow dt20 = new DartThrow(54);
                DartThrow dt21 = new DartThrow(130);

                DartThrow dt22 = new DartThrow(60);
                DartThrow dt23 = new DartThrow(60);
                DartThrow dt24 = new DartThrow(60);

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

                Turn turn1 = new Turn(1);
                turn1.EndTurn();
                Turn turn2 = new Turn(1);
                turn2.EndTurn();
                Turn turn3 = new Turn(1);
                turn3.EndTurn();
                Turn turn4 = new Turn(1);
                turn4.EndTurn();
                Turn turn5 = new Turn(1);
                turn5.EndTurn();
                Turn turn6 = new Turn(1);
                turn6.EndTurn();
                Turn turn7 = new Turn(1);
                turn7.EndTurn();
                Turn turn8 = new Turn(1);
                turn8.EndTurn();
                Turn turn9 = new Turn(1);
                turn9.EndTurn();
                Turn turn10 = new Turn(1);
                turn10.EndTurn();

                gp20.Turns.Add(turn1); 
                gp21.Turns.Add(turn2);
                gp22.Turns.Add(turn3);
                gp23.Turns.Add(turn4);
                gp24.Turns.Add(turn5);
                gp25.Turns.Add(turn6);
                gp10.Turns.Add(turn7);
                gp11.Turns.Add(turn8);
                gp12.Turns.Add(turn9);
                gp13.Turns.Add(turn10);

                turn1.Throws.Add(dt1);
                turn1.Throws.Add(dt2);
                turn1.Throws.Add(dt3);

                turn2.Throws.Add(dt4);
                turn2.Throws.Add(dt5);
                turn2.Throws.Add(dt6);

                turn3.Throws.Add(dt7);
                turn3.Throws.Add(dt8);
                turn3.Throws.Add(dt9);

                turn4.Throws.Add(dt10);
                turn4.Throws.Add(dt11);
                turn4.Throws.Add(dt12);

                turn5.Throws.Add(dt13);
                turn5.Throws.Add(dt14);
                turn5.Throws.Add(dt15);

                turn6.Throws.Add(dt16);
                turn6.Throws.Add(dt17);
                turn6.Throws.Add(dt18);

                turn7.Throws.Add(dt19);
                turn7.Throws.Add(dt20);
                turn7.Throws.Add(dt21);

                turn8.Throws.Add(dt22);
                turn8.Throws.Add(dt23);
                turn8.Throws.Add(dt24);

                turn9.Throws.Add(dt25);
                turn9.Throws.Add(dt26);
                turn9.Throws.Add(dt27);

                turn10.Throws.Add(dt28);
                turn10.Throws.Add(dt29);
                turn10.Throws.Add(dt30);

                _dbContext.Turns.Add(turn1);
                _dbContext.Turns.Add(turn2);
                _dbContext.Turns.Add(turn3);
                _dbContext.Turns.Add(turn4);
                _dbContext.Turns.Add(turn5);
                _dbContext.Turns.Add(turn6);
                _dbContext.Turns.Add(turn7);
                _dbContext.Turns.Add(turn8);
                _dbContext.Turns.Add(turn9);
                _dbContext.Turns.Add(turn10);
                
                _dbContext.SaveChanges();
            }
        }

    }
}
