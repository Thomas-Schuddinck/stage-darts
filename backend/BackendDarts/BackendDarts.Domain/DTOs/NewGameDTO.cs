using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class NewGameDTO
    {
        public String Name { get; set; }
        public int Type { get; set; }

        public List<int> Players { get; set; }
    }
}
