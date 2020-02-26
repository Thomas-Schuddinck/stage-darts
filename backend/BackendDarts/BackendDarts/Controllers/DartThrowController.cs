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
    public class DartThrowController : ControllerBase
    {
        private IDartThrowRepository _dartThrowRepository;

        public DartThrowController(IDartThrowRepository dartThrowRepository)
        {
            _dartThrowRepository = dartThrowRepository;
        }

        [HttpGet]
        public IEnumerable<ThrowDTO> GetAll()
        {
            return _dartThrowRepository.GetAll().Select(t => new ThrowDTO(t)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<ThrowDTO> GetBy(int id)
        {
            DartThrow a = _dartThrowRepository.GetBy(id);
            if (a == null) return NoContent();
            return new ThrowDTO(a);
        }

        [HttpPost("{value}")]
        public ActionResult<ThrowDTO> Post(int value)
        {

            DartThrow a = new DartThrow(value);
            _dartThrowRepository.Add(a);
            _dartThrowRepository.SaveChanges();
            return CreatedAtAction(nameof(GetBy), new { id = a.Id }, a);

        }

        // PUT: api/Afbeelding/5
        //[HttpPut("{id}")]
        //public ActionResult<dartThrow> Put()
        //{


        //}

        [HttpDelete("{id}")]
        public ActionResult<ThrowDTO> Delete(int id)
        {
            DartThrow dartThrow = _dartThrowRepository.GetBy(id);
            _dartThrowRepository.Delete(dartThrow);
            _dartThrowRepository.SaveChanges();
            return new ThrowDTO(dartThrow);
        }
    }
}