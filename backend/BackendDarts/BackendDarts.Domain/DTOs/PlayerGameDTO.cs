using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class PlayerGameDTO
    {
        private PlayerGame pg;

        public PlayerGameDTO(PlayerGame pg) : this()
        {
            Id = pg.Id;
            Player = new PlayerDTO(pg.Player);
            foreach (Leg l in pg.Legs)
            {
                this.Legs.Add(new LegDTO(l));
            }
        }

        public PlayerGameDTO()
        {

            Legs = new List<LegDTO>();
        }

        public int Id { get; set; }
        public PlayerDTO Player { get; set; }
        public List<LegDTO> Legs { get; set; }
    }
}
