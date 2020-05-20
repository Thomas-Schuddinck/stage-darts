using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class TournamentStatDTO
    {
        public int Id { get; set; }
        public bool IsWinner { get; set; }
        public int NumberCompetitors { get; set; }
        public string Winner { get; set; }
        public string Name { get; set; }

        public TournamentStatDTO(Tournament tournament, int idPlayer)
        {
            Id = tournament.Id;
            Name = tournament.Name;
            NumberCompetitors = tournament.PlayerTournaments.Count;
            IsWinner = tournament.Winner == idPlayer;
            Winner = tournament.GetWinnerName();


        }
    }
}
