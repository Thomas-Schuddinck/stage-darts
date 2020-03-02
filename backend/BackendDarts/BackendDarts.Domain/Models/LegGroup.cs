using System.Collections.Generic;

namespace BackendDarts.Models
{
    public class LegGroup
    {
        public int Id { get; set; }
        public int SetNr { get; set; }

        public List<PlayerLeg> PlayerLegs { get; set; }

        public LegGroup()
        {
            PlayerLegs = new List<PlayerLeg>();
        }
    }
}
