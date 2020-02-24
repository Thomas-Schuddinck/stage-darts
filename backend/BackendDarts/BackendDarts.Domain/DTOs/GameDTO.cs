using System;
using System.Collections.Generic;

namespace BackendDarts.Domain.DTOs
{
    public class GameDTO
    {
        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<PlayerGameDTO> Legs { get; set; }

    }
}