using BackendDarts.domein;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Models
{
    public interface IGameRepository
    {
        void Update(Game game);
        Game GetBy(int id);
        void Add(Game game);

        void Delete(Game game);

        IEnumerable<Game> GetAll();

        void SaveChanges();
    }
}
