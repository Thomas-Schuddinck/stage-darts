using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendDarts.Data.Repos.IRepos;
using Microsoft.AspNetCore.Mvc;

namespace BackendDarts.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class PiLinkController : ControllerBase
    {
        private IPiLinkRepository _piLinkRepository;

        public PiLinkController(IPiLinkRepository piLinkRepository)
        {
            _piLinkRepository = piLinkRepository;
        }

        /// <summary>
        /// Get the link to use the raspberry pi
        /// </summary>
        /// <returns>An object PiLink</returns>
        [HttpGet]
        public string Get()
        {
            return _piLinkRepository.Get().Url;
        }


        [HttpPut("{url}")]
        public ActionResult<string> SetUrl(string url)
        {
            _piLinkRepository.Update(url);
            _piLinkRepository.SaveChanges();
            return url;
        }

    }
}