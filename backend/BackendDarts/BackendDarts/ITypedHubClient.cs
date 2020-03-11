using System.Threading.Tasks;

namespace BackendDarts
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(string type, string payload);
    }
}
