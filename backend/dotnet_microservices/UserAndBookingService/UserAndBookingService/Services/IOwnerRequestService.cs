using UserAndBookingService.Models;

namespace UserAndBookingService.Services
{
    public interface IOwnerRequestService
    {
        void CreateOwnerRequest(int userId);
        List<OwnerRequest> GetAllRequests();
        List<OwnerRequest> GetPendingRequests();
        void UpdateStatus(int requestId, string status, int adminId);
    }
}
