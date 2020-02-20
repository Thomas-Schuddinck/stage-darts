﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PlayerGame> PlayerGames { get; set; }

        public Player(string name)
        {
            this.Name = name;
            PlayerGames = new List<PlayerGame>();
        }
    }
}
