using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class PlayerLegDTO
    {
       

        public PlayerLegDTO(PlayerLeg pg) : this()
        {
            Id = pg.Id;
            Player = new PlayerDTO(pg.Player);
            CurrentScore = 501;
            foreach (Turn t in pg.Turns)
            {
                this.Turns.Add(new TurnDTO(t));
                foreach(DartThrow dt in t)
                {
                    CurrentScore = CurrentScore - dt.Value;
                }
            }
            
        }

        public PlayerLegDTO()
        {

            Turns = new List<TurnDTO>();
        }

        public int Id { get; set; }
        public PlayerDTO Player { get; set; }
        public int CurrentScore { get; set; }
        public List<TurnDTO> Turns { get; set; }
    }
}
