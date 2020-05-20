using BackendDarts.Models;

namespace BackendDarts.Models
{
    public class PlayerTournament
    {
        public int TournamentId { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; }
        public Tournament Tournament { get; set; }

        public PlayerTournament()
        {
        }
        
    }
}
