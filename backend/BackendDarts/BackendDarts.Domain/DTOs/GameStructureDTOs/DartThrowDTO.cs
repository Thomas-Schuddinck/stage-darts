using BackendDarts.Models;

namespace BackendDarts.DTOs
{
    public class DartThrowDTO
    {

        public DartThrowDTO(DartThrow dt) : this()
        {
            Id = dt.Id;
            Area = dt.Area;
            Multiplier = dt.Multiplier;
            Value = dt.Value;

        }

        public DartThrowDTO()
        {
        }

        public int Id { get; set; }
        public int Area { get; set; }
        public int Multiplier { get; set; }
        public int Value { get; set; }
    }
}
