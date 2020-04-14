using BackendDarts.Models;

namespace BackendDarts.DTOs
{
    public class NewThrowDTO
    {

        public NewThrowDTO(int area, int multiplier)
        {
            
            Area = area;
            Multiplier = multiplier;

        }

        public int Area { get; set; }
        public int Multiplier { get; set; }
    }
}
