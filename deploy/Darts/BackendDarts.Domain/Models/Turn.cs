using System;
using System.Collections.Generic;

namespace BackendDarts.Models
{
    public class Turn
    {
        

        public int Id { get; set; }
        public int TurnNr { get; set; }
        public Boolean IgnoreScore { get; private set; } = false;
        public Boolean IsFinished { get; private set; } = false;


        public List<DartThrow> Throws { get; set; }

        public Turn()
        {
            Throws = new List<DartThrow>();
        }

        public Turn(int turnnr) : this()
        {
            this.TurnNr = turnnr;
        }

        public void AddThrow(int value)
        {
            Throws.Add(new DartThrow(value));
        }
        public void IgnoreAndEndTurn()
        {
            IgnoreScore = true;
            IsFinished = true;
        }

        public void EndTurn()
        {
            IsFinished = true;
        }
    }
}
