using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Models
{
    public class TempPlayerData
    {
        public int NumberOfWins { get; set; }
        public int NumberOfMisses { get; set; }
        public int NumberOfSixties { get; set; }
        public int TotalScoreThrown { get; set; }
        public int TotalNumberDartsThrown { get; set; }
        public double PercentageSixties { get; set; }
        public double AverageScoreThrown { get; set; }
        public double PercentageWins { get; set; }
        public double PercentageBoardHits { get; set; }
        public Player Player { get; set; }

        public TempPlayerData(Player player)
        {
        }
    }
}
