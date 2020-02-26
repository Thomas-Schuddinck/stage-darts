using BackendDarts.Models;

namespace BackendDarts.DTOs
{
    public class ThrowDTO
    {

        public ThrowDTO(DartThrow dt) : this()
        {
            Id = dt.Id;
            Value = dt.Value;
        }

        public ThrowDTO()
        {
        }

        public int Id { get; set; }
        public int Value { get; set; }
    }
}
