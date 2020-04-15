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
        public List<Game> Games { get; set; }
        public List<PlayerTournament> PlayerTournaments { get; set; } = new List<PlayerTournament>();
        public int Winner { get; set; }

        public Tournament()
        {
            Winner = -1;
        }
        public Tournament(NewGameDTO newGameDTO) : this()
        {
            Name = newGameDTO.Name;

        }
    }
}
