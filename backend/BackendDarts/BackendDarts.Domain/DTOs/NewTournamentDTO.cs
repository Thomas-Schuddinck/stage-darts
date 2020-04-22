using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs.Status
{
    public class NewTournamentDTO
    {
        public string Name { get; set; }
        public int Type { get; set; }

        public List<int> Players { get; set; }
    }
}
