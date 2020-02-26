using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class LegDTO
    {
        public int Id { get; set; }
        public int legNr { get; set; }
        public List<ThrowDTO> Throws { get; set; }
    }
}
