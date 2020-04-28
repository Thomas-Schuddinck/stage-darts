
using BackendDarts.Domain.Models;
using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class TournamentDTO : TournamentBasicDTO
    {

        public List<GameDTO> games = new List<GameDTO>();
        public TournamentDTO(Tournament tournament) : base(tournament)
        {
            foreach(Game game in tournament.Games)
                games.Add(new GameDTO(game));
        }
    }
}
