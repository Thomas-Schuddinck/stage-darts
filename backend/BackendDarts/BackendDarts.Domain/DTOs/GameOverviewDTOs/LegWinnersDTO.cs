using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.Models
{
    public class LegWinnersDTO
    {
        

        public string PlayerName { get; set; }
        public int Aantal { get; set; }

        public LegWinnersDTO()
        {
        }

        public LegWinnersDTO(string playerName, int aantal)
        {
            PlayerName = playerName;
            Aantal = aantal;
        }
    }
}
