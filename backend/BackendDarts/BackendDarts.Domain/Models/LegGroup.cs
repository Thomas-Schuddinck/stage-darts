using System.Collections.Generic;

namespace BackendDarts.Models
{
    public class LegGroup
    {
        public int Id { get; set; }
        public int Legnr { get; set; }
        public int Winner { get; set; }
        public List<PlayerLeg> PlayerLegs { get; set; }

        public LegGroup()
        {
            Winner = -1;
            PlayerLegs = new List<PlayerLeg>();
        }
        public void FinishLeg(int id)
        {
            Winner = id;
        }
    }
}
