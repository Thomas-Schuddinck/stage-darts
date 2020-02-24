using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.Models
{
    class PlayerStatsDTO
    {
        public string Name { get; set; }
        public int NumberOfWins { get; set; }
        public float PercentageTopThrow { get; set; }
        public int TotalScoreThrown { get; set; }
        public int AverageScoreThrown { get; set; }

    }
}
