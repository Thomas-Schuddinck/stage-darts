using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class TempPlayerDataDTO
    {
        public int NumberOfWins { get; set; }
        public int NumberOfSixties { get; set; }
        public int TotalScoreThrown { get; set; }
        public int TotalNumberDartsThrown { get; set; }
        public int TotalGamesPlayed { get; set; }
    }
}
