using BackendDarts.DTOs;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class LeaderboardDTO
    {
        public PlayerDTO player { get; set; }
        public int NumberOfWins { get; set; }
        public int TotalScoreThrown { get; set; }
        public double PercentageSixties { get; set; }
        public double PercentageWins { get; set; }
    }
}
