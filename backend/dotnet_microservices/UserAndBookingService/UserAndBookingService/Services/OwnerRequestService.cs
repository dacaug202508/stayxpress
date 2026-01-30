using UserAndBookingService.Models;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class OwnerRequestService : IOwnerRequestService
    {
        private readonly IOwnerRequestRepository _repo;

        public OwnerRequestService(IOwnerRequestRepository repo)
        {
            _repo = repo;
        }

        public void CreateOwnerRequest(int userId)
        {
            var existing = _repo.GetByUserId(userId)
                .FirstOrDefault(r => r.RequestStatus == "PENDING");

            if (existing != null)
                throw new Exception("Request already pending");

            var request = new OwnerRequest
            {
                UserId = userId,
                RequestStatus = "PENDING",
                RequestedAt = DateTime.UtcNow
            };

            _repo.Add(request);
        }
    }

}
