using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public interface IOwnerRequestRepository
    {
        void Add(OwnerRequest request);
        OwnerRequest? GetById(int id);
        List<OwnerRequest> GetAll();
        List<OwnerRequest> GetPendingRequests();
        List<OwnerRequest> GetByUserId(int userId);
        void Update(OwnerRequest request);
    }
}
