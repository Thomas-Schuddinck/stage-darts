using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos.IRepos
{
    public interface IPlayerGameRepository
    {
        void Update(PlayerGame playergame);
        PlayerGame GetBy(int id);
        void Add(PlayerGame playergame);

        void Delete(PlayerGame playergame);

        IEnumerable<PlayerGame> GetAll();

        void SaveChanges();
    }
}
