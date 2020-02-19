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
    public class DartThrowRepository : IDartThrowRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<DartThrow> _dartThrows;
        public DartThrowRepository(ApplicationDbContext context)
        {
            _context = context;
            _dartThrows = context.DartThrows;
        }

        public void Add(DartThrow dartThrow)
        {
            _dartThrows.Add(dartThrow);
        }

        public void Delete(DartThrow dartThrow)
        {

            _dartThrows.Remove(dartThrow);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<DartThrow> GetAll()
        {
            return _dartThrows.ToList();
        }

        public DartThrow GetBy(int id)
        {
            return _dartThrows.SingleOrDefault(a => a.Id == id);
        }

        public void Update(DartThrow dartThrow)
        {
            _dartThrows.Update(dartThrow);
        }
    }
}
