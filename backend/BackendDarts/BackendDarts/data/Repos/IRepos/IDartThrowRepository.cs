using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Repos.IRepos
{
    public interface IDartThrowRepository
    {
        void Update(DartThrow dartThrow);
        DartThrow GetBy(int id);
        void Add(DartThrow dartThrow);

        void Delete(DartThrow dartThrow);

        IEnumerable<DartThrow> GetAll();

        void SaveChanges();
    }
}
