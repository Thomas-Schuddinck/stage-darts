using BackendDarts.Models;
using System;
using System.Collections.Generic;

namespace BackendDarts.DTOs
{
    public class GameDTO
    {
       

        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<LegGroupDTO> LegGroups { get; set; }
        public List<PlayerDTO> Players { get; set; }

        public GameDTO()
        {

            LegGroups = new List<LegGroupDTO>();
            Players = new List<PlayerDTO>();
        }

        public GameDTO(Game g) : this()
        {
            this.Id = g.Id;
            this.beginDate = g.beginDate;
            this.endDate = g.endDate;
            foreach (LegGroup lg in g.LegGroups)
            {
                    this.LegGroups.Add(new LegGroupDTO(lg));

            };
            foreach (PlayerGame p in g.PlayerGames)
            {
                this.Players.Add(new PlayerDTO(p.Player));

            };
        }
    }
}