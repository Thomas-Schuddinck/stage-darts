using BackendDarts.Models;
using System.Collections.Generic;

namespace BackendDarts.DTOs
{
    public class LegDTO
    {

        public LegDTO()
        {
            Throws = new List<ThrowDTO>(); ;
        }

        public LegDTO(Leg l) : this()
        {
            Id = l.Id;
            this.LegNr = l.LegNr;
            foreach (DartThrow dt in l.Throws)
            {
                this.Throws.Add(new ThrowDTO(dt));
            }
        }

        public int Id { get; set; }
        public int LegNr { get; set; }
        public List<ThrowDTO> Throws { get; set; }
    }
}
