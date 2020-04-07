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

        /// <summary>
        /// Adds Throw to the list of throws
        /// </summary>
        /// <param name="area">The area where the dart landed</param>
        /// <param name="multiplier">the multiplier of the throw, by default 1</param>
        /// <returns>true if the turn is full and so has ended</returns>
        public Boolean AddThrow(int area, int multiplier)
        {
            Throws.Add(new DartThrow(area, multiplier));
            if(Throws.Count == 3)
            {
                EndTurn();
                return true;
            }
            return false;
        }
        /// <summary>
        /// called when a turn would result in a negative score. When called, this turn is ignored when calculating a score.
        /// </summary>
        public void IgnoreAndEndTurn()
        {
            IgnoreScore = true;
            IsFinished = true;
        }
        /// <summary>
        /// End this turn
        /// </summary>
        public void EndTurn()
        {
            IsFinished = true;
        }
    }
}
