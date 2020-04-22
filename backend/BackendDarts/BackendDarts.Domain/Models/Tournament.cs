using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
            int aantalStages = (int)Math.Log2(players.Count);
            AddPlayers(players);
            //finale
            AddGame(new Game(1, aantalStages, Name, players));
            //other games
            for (int j = 1; j < aantalStages; j++)
            {
                for (int i = 0; i < players.Count- (int)Math.Pow(2, j)+1; i += (int)Math.Pow(2, j))
                {
                    AddGame(new Game((i + (int)Math.Pow(2, j)) / 2, j, Name, players.GetRange(i,(int)Math.Pow(2, j))));
                }
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
        private void AddPlayers(List<Player> players)
        {
            foreach (Player player in players)
                AddPlayer(player);
        }
        private void AddGame(Game game)
        {
            Games.Add(game);
        }

        public void RemoveLoserFromBracket(Game gameRemove, Player player)
        {

            foreach(Game game in Games)
            {
                if (game.BracketStageNumber > gameRemove.BracketStageNumber)
                    game.RemovePlayer(player);
            }
        }

        private void SetWinner(int idWinner)
        {
            Winner = idWinner;
        }

    }
}
