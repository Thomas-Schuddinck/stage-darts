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
        public List<PlayerGameDTO> PlayerGames { get; set; }

        public GameDTO()
        {

            PlayerGames = new List<PlayerGameDTO>();
        }

        public GameDTO(Game g) : this()
        {
            this.Id = g.Id;
            this.beginDate = g.beginDate;
            this.endDate = g.endDate;
            foreach (PlayerGame pg in g.PlayerGames)
            {
                this.PlayerGames.Add(new PlayerGameDTO(pg));
            }
        }
    }
}