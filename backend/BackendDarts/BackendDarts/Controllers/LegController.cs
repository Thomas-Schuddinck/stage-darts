using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.DTOs;
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
        public IEnumerable<LegDTO> GetAll()
        {
            return _legRepository.GetAll().Select(l => new LegDTO(l)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<LegDTO> GetBy(int id)
        {
            Leg a = _legRepository.GetBy(id);
            if (a == null) return NoContent();
            return new LegDTO(a);
        }

        [HttpPost]
        public ActionResult<LegDTO> Post()
        {

            Leg a = new Leg();
            _legRepository.Add(a);
            _legRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        // PUT: api/Afbeelding/5
        //[HttpPut("{id}")]
        //public ActionResult<leg> Put()
        //{


        //}

        [HttpDelete("{id}")]
        public ActionResult<LegDTO> Delete(int id)
        {
            Leg leg = _legRepository.GetBy(id);
            _legRepository.Delete(leg);
            _legRepository.SaveChanges();
            return new LegDTO(leg);
        }
    }
}