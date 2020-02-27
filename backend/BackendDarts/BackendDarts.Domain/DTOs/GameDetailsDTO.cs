using System.Collections.Generic;
namespace BackendDarts.DTOs
{
    public class GameDetailsDTO
    {
        public GameDTO Game { get; set; }
        public PlayerDTO CurrentPlayer { get; set; }
        public PlayerDTO NextPlayer { get; set; }
        public int LastThrow { get; set; }
        public LegDTO CurrentLeg { get; set; }
        public IEnumerable<PlayerGameDTO> PlayerGames { get; set; }

        public GameDetailsDTO(GameDTO game)
        {
            Game = game;

        }
    }
}
