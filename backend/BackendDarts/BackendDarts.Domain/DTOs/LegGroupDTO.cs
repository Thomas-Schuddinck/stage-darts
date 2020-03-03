using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class LegGroupDTO
    {

        public LegGroupDTO(LegGroup lg) : this()
        {
            Id = lg.Id;
            Winner = lg.Winner;
            Legnr = lg.Legnr;

            foreach (PlayerLeg pl in lg.PlayerLegs)
            {
                this.PlayerLegs.Add(new PlayerLegDTO(pl));
            }
        }

        public LegGroupDTO()
        {

            PlayerLegs = new List<PlayerLegDTO>();
        }

        public int Id { get; set; }
        public int Legnr { get; set; }
        public int Winner { get; set; }
        public List<PlayerLegDTO> PlayerLegs { get; set; }
    }
}
