using BackendDarts.Domain.Models;
using BackendDarts.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class TournamentBasicDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<PlayerDTO> Players { get; set; } = new List<PlayerDTO>();

        public TournamentBasicDTO(Tournament tournament)
        {
            Id = tournament.Id;
            Name = tournament.Name;
            foreach (PlayerTournament playerTournament in tournament.PlayerTournaments)
                Players.Add(new PlayerDTO(playerTournament.Player));
        }
    }
}
