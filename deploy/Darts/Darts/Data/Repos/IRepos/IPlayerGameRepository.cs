using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos.IRepos
{
    public interface IPlayerLegRepository
    {
        void Update(PlayerLeg playergame);
        PlayerLeg GetBy(int id);
        void Add(PlayerLeg playergame);

        void Delete(PlayerLeg playergame);

        IEnumerable<PlayerLeg> GetAll();

        void SaveChanges();
    }
}
