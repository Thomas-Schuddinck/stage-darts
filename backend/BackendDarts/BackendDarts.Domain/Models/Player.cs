using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Game> Games { get; set; } 
        [NotMapped]
        public string Name => String.Format("{0} {1}", FirstName ,LastName);
        public Player(string firstName, string lastName) : this()
        {
            FirstName = firstName;
            LastName = lastName;

        }
        public Player()
        {
            
            Games = new List<Game>();

        }

    }
}
