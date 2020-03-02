using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class PlayerLegDTO
    {
        private PlayerLeg pg;

        public PlayerLegDTO(PlayerLeg pg) : this()
        {
            Id = pg.Id;
            Player = new PlayerDTO(pg.Player);
            foreach (Turn t in pg.Turns)
            {
                this.Turns.Add(new TurnDTO(t));
            }
        }

        public PlayerLegDTO()
        {

            Turns = new List<TurnDTO>();
        }

        public int Id { get; set; }
        public PlayerDTO Player { get; set; }
        public List<TurnDTO> Turns { get; set; }
    }
}
