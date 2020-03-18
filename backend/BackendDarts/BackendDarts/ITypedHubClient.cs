
using BackendDarts.DTOs;
using BackendDarts.DTOs.Status;
using System.Threading.Tasks;

namespace BackendDarts
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(string type, string payload);

        Task UpdateGame(StatusDTO statusDTO);
    }
}
