using BackendDarts.Models;
using System.Collections.Generic;
namespace BackendDarts.DTOs
{
    public class GameDetailsDTO
    {
        public GameDTO Game { get; set; }
        public PlayerDTO CurrentPlayer { get; set; }
        public PlayerDTO NextPlayer { get; set; }
        public int LastThrow { get; set; }
        public TurnDTO CurrentTurn { get; set; }
        public LegGroupDTO CurrentLegGroup { get; set; }

        public IEnumerable<PlayerLegDTO> PlayerGames { get; set; }

        public GameDetailsDTO(Game game)
        {
            Game = new GameDTO(game);
            CurrentPlayer = new PlayerDTO(game.GetCurrentPlayer());
            NextPlayer = new PlayerDTO(game.GetNextPlayer());
            CurrentLegGroup = new LegGroupDTO(game.CurrentLegGroup);
            CurrentTurn = new TurnDTO(game.GetCurrentTurn());

        }
    }
}
