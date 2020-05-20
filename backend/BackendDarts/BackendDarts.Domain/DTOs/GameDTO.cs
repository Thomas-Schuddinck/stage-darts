
using BackendDarts.Models;
using System;
using System.Collections.Generic;

namespace BackendDarts.DTOs
{
    public class GameDTO
    {

        public int Id { get; set; }
        public DateTime beginDate { get; set; }
        public DateTime endDate { get; set; }
        public List<LegGroupDTO> LegGroups { get; set; }
        public List<PlayerDetailDTO> Players { get; set; }

        //For Tournaments
        public int BracketSectorNumber { get; set; }
        public int BracketStageNumber { get; set; }
        public bool TournamentPlayable { get; set; }
        public bool IsFinished { get; set; }
        public int TournamentId { get; set; }
        public GameDTO()
        {

            LegGroups = new List<LegGroupDTO>();
            Players = new List<PlayerDetailDTO>();
        }

        public GameDTO(Game g) : this()
        {
            this.Id = g.Id;
            this.beginDate = g.BeginDate;
            this.endDate = g.EndDate;
            this.TournamentPlayable = g.TournamentPlayable;
            this.IsFinished = g.IsFinished;
            this.BracketSectorNumber = g.BracketSectorNumber;
            this.BracketStageNumber = g.BracketStageNumber;
            this.TournamentId = g.Tournament == null ? -1 : g.Tournament.Id;
            Dictionary<int, int> winnarsmap = new Dictionary<int, int>();
            foreach (LegGroup lg in g.LegGroups)
            {
                this.LegGroups.Add(new LegGroupDTO(lg));
                if (lg.Winner != -1)
                {

                    if (winnarsmap.ContainsKey(lg.Winner))
                    {
                        winnarsmap[lg.Winner] = winnarsmap[lg.Winner] + 1;
                    }
                    else
                    {
                        winnarsmap.Add(lg.Winner, 1);
                    }
                }

            };
            foreach (PlayerGame p in g.PlayerGames)
                this.Players.Add(new PlayerDetailDTO(p.Player, winnarsmap.ContainsKey(p.PlayerId) ? winnarsmap[p.PlayerId] : 0));

        }

    }
}