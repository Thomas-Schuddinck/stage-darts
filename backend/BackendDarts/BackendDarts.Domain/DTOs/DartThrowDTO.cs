using BackendDarts.Models;

namespace BackendDarts.DTOs
{
    public class DartThrowDTO
    {

        public DartThrowDTO(DartThrow dt) : this()
        {
            Id = dt.Id;
            Value = dt.Value;
        }

        public DartThrowDTO()
        {
        }

        public int Id { get; set; }
        public int Value { get; set; }
    }
}
