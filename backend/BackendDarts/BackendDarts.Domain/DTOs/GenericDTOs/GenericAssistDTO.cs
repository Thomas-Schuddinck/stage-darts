using BackendDarts.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class GenericAssistDTO
    {
        public object Body { get; set; }
        public List<int> Players { get; set; }
    }
}
