using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class PlayerGameDTO
    {
        public int Id { get; set; }
        public PlayerDTO Player { get; set; }
        public List<LegDTO> Legs { get; set; }
    }
}
