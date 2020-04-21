using System;
using System.Collections.Generic;
using System.Text;

namespace BackendDarts.Domain.DTOs
{
    public class GenericCreationDTO
    {
        public int Id { get; private set; }
        public object Body { get; private set; }
        public GenericCreationDTO(int id, object body)
        {
            this.Id = id;
            this.Body = body;
        }
        {

        }
    }
}
