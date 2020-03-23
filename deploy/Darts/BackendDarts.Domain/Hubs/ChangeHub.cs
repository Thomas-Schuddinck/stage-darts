using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BackendDarts.Hubs
{
    public class ChangeHub : Hub
    {
        public async Task NotifyChanges()
        {
            await Clients.All.SendAsync();
        }

    }
}
