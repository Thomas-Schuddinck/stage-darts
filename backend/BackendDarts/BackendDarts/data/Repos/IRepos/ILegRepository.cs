using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Repos.IRepos
{
    public interface ILegRepository
    {
        void Update(Leg leg);
        Leg GetBy(int id);
        void Add(Leg leg);

        void Delete(Leg leg);

        IEnumerable<Leg> GetAll();

        void SaveChanges();
    }
}
