using UserAndBookingService.Dto;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class AdminOwnerRequestService : IAdminOwnerRequestService
    {
        private readonly IOwnerRequestRepository _requestRepo;
        private readonly IUserRepository _userRepo;

        public AdminOwnerRequestService(IOwnerRequestRepository requestRepo, IUserRepository userRepo)
        {
            _requestRepo = requestRepo;
            _userRepo = userRepo;
        }

        public List<OwnerRequestDto> GetAllRequests()
        {
            return _requestRepo.GetAll()
                .Select(r => new OwnerRequestDto
                {
                    RequestId = r.Id,
                    UserId = r.UserId,
                    Status = r.RequestStatus,
                    RequestedAt = r.RequestedAt
                }).ToList();
        }

        public List<OwnerRequestDto> GetPendingRequests()
        {
            return _requestRepo.GetPendingRequests()
                .Select(r => new OwnerRequestDto
                {
                    RequestId = r.Id,
                    UserId = r.UserId,
                    Status = r.RequestStatus,
                    RequestedAt = r.RequestedAt
                }).ToList();
        }

        
        public void UpdateRequestStatus(int requestId, string status, int adminId)
        {
            var request = _requestRepo.GetById(requestId);
            if (request == null)
                throw new Exception("Request not found");

            status = status.ToUpper();

            if (status != "PENDING" && status != "APPROVED" && status != "REJECTED")
                throw new Exception("Invalid status");

            request.RequestStatus = status;
            request.ReviewedAt = DateTime.UtcNow;
            request.ReviewedBy = adminId;

            _requestRepo.Update(request);

            var user = _userRepo.GetById(request.UserId);

            if (status == "APPROVED")
                user.Role = "OWNER";
            else if (user.Role == "OWNER")
                user.Role = "CUSTOMER";

            _userRepo.Update(user);
        }
    }
}
