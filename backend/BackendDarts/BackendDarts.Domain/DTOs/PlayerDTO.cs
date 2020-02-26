using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.DTOs
{
    public class PlayerDTO
    {

        public PlayerDTO(Player p)
        {
            Id = p.Id;
            Name = p.Name;
        }
        public PlayerDTO()
        {
        }

        public int Id { get; set; }
        public String Name { get; set; }
    }
}
