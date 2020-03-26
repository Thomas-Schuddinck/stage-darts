using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class NewGameDTO
    {
        public string Name { get; set; }
        public int Type { get; set; }

        public List<int> Players { get; set; }
    }
}
