using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.Models
{
    public class TournamentGame : Game
    {
        public int BracketSectorNumber {get; private set; }
        public TournamentGame(int bracketSectorNr, string name) : base()
        {
            BracketSectorNumber = bracketSectorNr;
            Name = name + " Tournament - " + PlayerGames.Count + "Players";
            Type = 3;
        }
    }
}
