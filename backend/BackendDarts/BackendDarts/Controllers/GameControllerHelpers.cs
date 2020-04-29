using BackendDarts.data.Repos.IRepos;
using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Domain.DTOs;
using BackendDarts.Domain.Models;
using BackendDarts.DTOs;
using BackendDarts.DTOs.Status;
using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Controllers
{
    public class GameControllerHelpers
    {

        public GameControllerHelpers()
        {
        }

        /// <summary>
        /// Handle a new given dartthrow for given game
        /// </summary>
        /// <param name="game">The given game</param>
        /// <param name="dartThrow">The given throw</param>
        /// <returns>The status of the game</returns>
        public int HandleThrow(Game game, NewThrowDTO dartThrow)
        {

            // calculations
            CreateNewTurnIfRequired(game);

            bool allDartsThrown = game.AddThrow(dartThrow.Area, dartThrow.Multiplier);


            int gameStatus = CheckGameStatus(game, game.CalculateScore(game.GetCurrenPlayerLeg()));
            if ((allDartsThrown && gameStatus == -1) || gameStatus == -2)
                game.SetNextPlayer();
            // if all darts are thrown, multiply status by 2 (see FillStatusDTO for use, used for ending turn)
            gameStatus = !allDartsThrown ? gameStatus : gameStatus * 2;

            return gameStatus;


        }

        /// <summary>
        /// Checks if a new Turn should be made.
        /// If the requirements are met, a new Turn will be added to the given PlayerLeg of a given Game
        /// </summary>
        /// <param name="playerLeg">The given PlayerLeg</param>
        /// <param name="game">The gvien Game</param>
        private void CreateNewTurnIfRequired(Game game)
        {
            //laatste turn in beurt eindig turn
            if (game.GetCurrenPlayerLeg().Turns.Count == 0 || game.GetCurrentTurn().IsFinished)
                game.CreateEmptyTurn();

        }

        /// <summary>
        /// Returns a status depending on the current game situation.
        /// 
        /// </summary>
        /// <param name="game">The current Game</param>
        /// <param name="score">The score of the current PlayerLeg</param>
        /// <returns>Returns "1" if the current Leg is finished (when a player reaches score 501), returns "2" if the game has ended, returns "-1" by default</returns>
        private int CheckGameStatus(Game game, int score)
        {
            // variables
            PlayerLeg playerLeg = game.GetCurrenPlayerLeg();

            // calculations + returns
            if (score == 501)
            {
                game.EndLeg();
                return game.Winner == -1 ? 0 : 1;
            }
            else
            {
                if (score > 501) { 
                    playerLeg.Turns[playerLeg.Turns.Count - 1].IgnoreAndEndTurn(); ;
                    return -2;
                }
                return -1;
            }

        }

        /// <summary>
        /// Fill a new game status DTO
        /// </summary>
        /// <param name="game">The given game</param>
        /// <param name="gameStatus">the given game status</param>
        /// <returns>The game status (DTO format)</returns>
        public StatusDTO FillStatusDTO(Game game, int gameStatus)
        {
            // variables
            StatusDTO statusDTO = new StatusDTO
            {
                Status = gameStatus % 2,
                Winner = game.Winner < 0 ?  "" : game.PlayerGames.Find(pg => pg.PlayerId == game.Winner).Player.Name,
                gameDTO = new GameDetailsDTO(game)
            };

            if (gameStatus > 2)
                statusDTO.gameDTO.Game.LegGroups.Last().GoNextPlayerLeg();

            // return
            return statusDTO;
        }


        public Dictionary<string, int> CalculateLegWinners(Game game)
        {
            Dictionary<string, int> dictionary = new Dictionary<string, int>();
            Player temp;
            foreach (LegGroup lg in game.LegGroups)
            {
                if(lg.Winner != -1)
                {
                    temp = game.FindPlayerById(lg.Winner);
                    if (dictionary.ContainsKey(temp.Name))
                    {
                        dictionary[temp.Name]++;

                    }
                    else
                    {
                        dictionary.Add(temp.Name, 1);
                    }
                }
                
            }
            foreach (PlayerGame pg in game.PlayerGames)
            {
                if (!dictionary.ContainsKey(pg.Player.Name))
                {
                    dictionary.Add(pg.Player.Name, 0);
                }
            }
            return dictionary;
        }

    }
}
