using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.Models
{
    public class TournamentGame : Game
    {
        public int BracketSectorNumber {get; private set; }
        public TournamentGame(int bracketSectorNr, string name, Player player1,  Player player2)
        {
            BracketSectorNumber = bracketSectorNr;
            Name = name + " Tournament - " + player1.Name + " VS " + player2.Name;
            Type = 3;
            AddPlayer(player1);
            AddPlayer(player2);
            BeginDate = DateTime.Now.Date;
            SetupGame();
        }
    }
}
