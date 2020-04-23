using BackendDarts.Models;
using System;

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
