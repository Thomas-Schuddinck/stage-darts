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

        public GameDTO()
        {

            LegGroups = new List<LegGroupDTO>();
        }

        public GameDTO(Game g) : this()
        {
            this.Id = g.Id;
            this.beginDate = g.beginDate;
            this.endDate = g.endDate;
            foreach (LegGroup lg in g.LegGroups)
            {
                    this.LegGroups.Add(new LegGroupDTO(lg));

            }
        }
    }
}