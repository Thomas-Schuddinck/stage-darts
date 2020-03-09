using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class PlayerDetailDTO
    {
        public PlayerDetailDTO() { }

        public PlayerDetailDTO(Player player, int legsWon)
        {
            this.LegsWon = legsWon;
            this.PlayerDTO = new PlayerDTO(player);
        }

        public int LegsWon { get; set; }
        public PlayerDTO PlayerDTO { get; set; }
    }
}
