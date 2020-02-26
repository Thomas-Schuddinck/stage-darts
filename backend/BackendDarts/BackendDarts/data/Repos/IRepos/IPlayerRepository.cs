using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.data.Repos.IRepos
{
    public interface IPlayerRepository
    {
        void Update(Player player);
        Player GetBy(int id);
        void Add(Player player);

        void Delete(Player player);

        IEnumerable<Player> GetAll();

        IEnumerable<Game> GetAllGamesSimpleFromPlayer(int id);

        IEnumerable<Game> GetAllGamesFromPlayer(int id);

        void SaveChanges();
    }
}
