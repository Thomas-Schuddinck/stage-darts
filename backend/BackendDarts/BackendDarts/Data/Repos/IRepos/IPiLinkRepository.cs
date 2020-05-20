using BackendDarts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos.IRepos
{
    public interface IPiLinkRepository
    {
        void Update(string piLink);
        PiLink Get();
        public void Add(PiLink pl);
        void SaveChanges();
    }
}
