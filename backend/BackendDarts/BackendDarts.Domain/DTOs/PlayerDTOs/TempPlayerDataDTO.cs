using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class LeaderboardPlayerDataDTO
    {
        public int NumberOfWins { get; set; }
        public double NumberOfSixties { get; set; }
        public int TotalScoreThrown { get; set; }
        public int TotalNumberDartsThrown { get; set; }
        public int TotalGamesPlayed { get; set; }
    }
}
