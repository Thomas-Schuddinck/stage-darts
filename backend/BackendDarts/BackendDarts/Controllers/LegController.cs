using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.Models;
using BackendDarts.Repos.IRepos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDarts.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LegController : ControllerBase
    {
        private ILegRepository _legRepository;

        public LegController(ILegRepository legRepository)
        {
            _legRepository = legRepository;
        }

        [HttpGet]
        public IEnumerable<Leg> GetAll()
        {
            return _legRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Leg> GetBy(int id)
        {
            Leg a = _legRepository.GetBy(id);
            if (a == null) return NoContent();
            return a;
        }

        [HttpPost]
        public ActionResult<Leg> Post()
        {

            Leg a = new Leg();
            _legRepository.Add(a);
            _legRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.LegId }, a);

        }

        // PUT: api/Afbeelding/5
        //[HttpPut("{id}")]
        //public ActionResult<leg> Put()
        //{


        //}

        [HttpDelete("{id}")]
        public ActionResult<Leg> Delete(int id)
        {
            Leg leg = _legRepository.GetBy(id);
            _legRepository.Delete(leg);
            _legRepository.SaveChanges();
            return leg;
        }
    }
}