using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Models
{
    public class PiLink
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public PiLink()
        {
            Url = "set the url first";
        }
    }
}
