using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Domain;
using BackendDarts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDarts.Data.Repos
{
    public class PiLinkRepository: IPiLinkRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<PiLink> _pilinks;
        public PiLinkRepository(ApplicationDbContext context)
        {
            _context = context;
            _pilinks = context.PiLinks;
        }

        public void Add(PiLink pl)
        {
            _pilinks.Add(pl);
        }

        public PiLink Get()
        {
            return _pilinks.SingleOrDefault(pl => pl.Id == 1);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(string piLink)
        {
            _pilinks.SingleOrDefault(pl => pl.Id == 1).Url = piLink;
        }
    }
}
