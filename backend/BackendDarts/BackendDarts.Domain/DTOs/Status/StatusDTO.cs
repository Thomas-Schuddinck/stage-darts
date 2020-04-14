using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs.Status
{
    public class StatusDTO
    {
        public int Status { get; set; }
        public string Winner { get; set; }

        public GameDetailsDTO gameDTO { get; set; }

        

    }
}
