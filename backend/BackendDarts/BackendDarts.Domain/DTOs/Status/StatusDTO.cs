using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs.Status
{
    public class StatusDTO
    {
        public int Status { get; set; }

        public AddThrowDTO AddThrow { get; set; }

        public EndGameDTO EndGame { get; set; }
        public NewLegDTO NewLeg { get; set; }
        public NewTurnDTO NewTurn { get; set; }

    }
}
