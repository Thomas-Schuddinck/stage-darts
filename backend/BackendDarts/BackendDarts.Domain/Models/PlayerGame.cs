
namespace BackendDarts.Models
{
    
    public class PlayerGame
        {
            public int GameId { get; set; }
            public int PlayerId { get; set; }
            public Player Player { get; set; }
            public Game Game { get; set; }

        public PlayerGame()
        {
        }
    }
}
