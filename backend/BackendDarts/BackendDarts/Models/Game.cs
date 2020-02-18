using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }

    }
}
