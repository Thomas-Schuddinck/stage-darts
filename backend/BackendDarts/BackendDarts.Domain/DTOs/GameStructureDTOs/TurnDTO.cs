using BackendDarts.Models;
using System.Collections.Generic;

namespace BackendDarts.DTOs
{
    public class TurnDTO
    {

        public TurnDTO()
        {
            Throws = new List<DartThrowDTO>(); ;
        }

        public TurnDTO(Turn t) : this()
        {
            Id = t.Id;
            this.TurnNr = t.TurnNr;
            foreach (DartThrow dt in t.Throws)
            {
                this.Throws.Add(new DartThrowDTO(dt));
            }
        }

        public int Id { get; set; }
        public int TurnNr { get; set; }
        public List<DartThrowDTO> Throws { get; set; }
    }
}
