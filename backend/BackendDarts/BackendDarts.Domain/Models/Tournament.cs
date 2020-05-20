using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace BackendDarts.Models
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
        public Tournament(GenericCreationDTO newGameDTO) : this()
        {
            Name = newGameDTO.Name;

        }

        public void SetupTournament(List<Player> players)
        {
            int aantalStages = (int)Math.Log2(players.Count);
            AddPlayers(players);
            //finale
            AddGame(new Game(1, aantalStages, Name, players, this));
            //other games
            for (int j = 1; j < aantalStages; j++)
            {
                for (int i = 0; i < players.Count- (int)Math.Pow(2, j)+1; i += (int)Math.Pow(2, j))
                {
                    AddGame(new Game((i + (int)Math.Pow(2, j)) / (int)Math.Pow(2, j), j, Name, players.GetRange(i,(int)Math.Pow(2, j)), this));
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

        public void RemoveLoserFromBracket(int bracketStageNumber, Player player)
        {

            foreach(Game game in Games)
            {
                if (game.BracketStageNumber > bracketStageNumber)
                    game.RemovePlayer(player);
            }
        }

        private void SetWinner(int idWinner)
        {
            Winner = idWinner;
        }

        public string GetWinnerName()
        {
            return Winner == -1 ? "No Winner" : PlayerTournaments.FirstOrDefault(pt => pt.PlayerId == Winner).Player.Name;
        }


        public void EvaluatTournament(Game game, Player player)
        {
            if (game.BracketStageNumber == Math.Log2(PlayerTournaments.Count))
                SetWinner(game.Winner);
            else
                RemoveLoserFromBracket(game.BracketStageNumber, player);
        }
    }
}
