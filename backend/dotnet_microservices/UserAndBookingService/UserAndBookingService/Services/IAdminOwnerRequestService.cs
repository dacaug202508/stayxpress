using UserAndBookingService.Dto;
namespace UserAndBookingService.Services
{
    public interface IAdminOwnerRequestService
    {
        List<OwnerRequestDto> GetAllRequests();
        List<OwnerRequestDto> GetPendingRequests();
        void UpdateRequestStatus(int requestId, string status, int adminId);
    }


}
