using BackendDarts.data;
using BackendDarts.Domain;
using BackendDarts.Models;
using BackendDarts.Repos.IRepos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Repos
{
    public class LegRepository: ILegRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Leg> _legs;
        public LegRepository(ApplicationDbContext context)
        {
            _context = context;
            _legs = context.Legs;
        }

        public void Add(Leg leg)
        {
            _legs.Add(leg);
        }

        public void Delete(Leg leg)
        {

            _legs.Remove(leg);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Leg> GetAll()
        {
            return _legs.ToList();
        }

        public Leg GetBy(int id)
        {
            return _legs.SingleOrDefault(a => a.Id == id);
        }

        public void Update(Leg leg)
        {
            _legs.Update(leg);
        }
    }
}
