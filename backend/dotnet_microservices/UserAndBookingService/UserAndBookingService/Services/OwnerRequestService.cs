using UserAndBookingService.Models;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class OwnerRequestService : IOwnerRequestService
    {
        private readonly IOwnerRequestRepository _repo;
        private readonly IUserRepository _userRepo;

        public OwnerRequestService(
            IOwnerRequestRepository repo,
            IUserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
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

        public List<OwnerRequest> GetAllRequests() =>
            _repo.GetAll();

        public List<OwnerRequest> GetPendingRequests() =>
            _repo.GetPendingRequests();

        public void UpdateStatus(int requestId, string status, int adminId)
        {
            var request = _repo.GetById(requestId);
            if (request == null)
                throw new Exception("Request not found");

            request.RequestStatus = status;
            request.ReviewedAt = DateTime.UtcNow;
            request.ReviewedBy = adminId;

            _repo.Update(request);

            // 🔥 Role update logic
            var user = _userRepo.GetById(request.UserId);
            if (user != null)
            {
                if (status == "APPROVED")
                    user.Role = "OWNER";
                else if (user.Role == "OWNER")
                    user.Role = "CUSTOMER";

                _userRepo.Update(user);
            }
        }
    }
}
