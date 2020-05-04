using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.Models
{
    public class GameOverviewDTO
    {
        public string Winner { get; set; }
        public List<LegWinnersDTO> LegWinners { get; set; } = new List<LegWinnersDTO>();
        public GameDTO game { get; set; }

        public GameOverviewDTO(Game game)
        {
            this.game = new GameDTO(game);
        }
    }
}
