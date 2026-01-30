using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public interface IOwnerRequestRepository
    {
        List<OwnerRequest> GetPendingRequests();
        OwnerRequest GetById(int id);
        void Update(OwnerRequest request);
        List<OwnerRequest> GetAll();
        IEnumerable<OwnerRequest> GetByUserId(int userId);
        void Add(OwnerRequest request);

    }

}
