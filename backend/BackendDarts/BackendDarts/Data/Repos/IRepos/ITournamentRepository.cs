using BackendDarts.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos.IRepos
{
    public interface ITournamentRepository
    {
        void Update(Tournament tournament);
        Tournament GetBy(int id);
        void Add(Tournament tournament);

        void Delete(Tournament tournament);

        IEnumerable<Tournament> GetAll();

        void SaveChanges();
    }
}
