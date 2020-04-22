using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.Models
{
    public class Tournament
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public List<Game> Games { get; set; } = new List<Game>();
        public List<PlayerTournament> PlayerTournaments { get; set; } = new List<PlayerTournament>();
        public int Winner { get; private set; }

        public Tournament()
        {
            Winner = -1;
        }
        public Tournament(NewGameDTO newGameDTO) : this()
        {
            Name = newGameDTO.Name;

        }

        public void SetupTournament(List<Player> players)
        {
            for(int i = 1; i < players.Count; i+=2)
            {
                Player player1 = players[i - 1];
                Player player2 = players[i];
                AddPlayer(player1);
                AddPlayer(player2);
                AddGame(new Game(i, Name, player1, player2));
            }
        }
        private void AddPlayer(Player player)
        {
            PlayerTournaments.Add(new PlayerTournament
            {
                Player = player,
                Tournament = this
            }
            );
        }

        private void AddGame(Game game)
        {
            Games.Add(game);
        }

        private void SetWinner(int idWinner)
        {
            Winner = idWinner;
        }
    }
}
