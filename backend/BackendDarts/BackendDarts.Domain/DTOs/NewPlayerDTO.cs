using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class NewPlayerDTO
    {

        public NewPlayerDTO(string firstName, string lastName, string email)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
        }

        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
    }
}
