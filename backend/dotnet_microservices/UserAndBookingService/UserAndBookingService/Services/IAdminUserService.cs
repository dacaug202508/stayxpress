using UserAndBookingService.Dto;

namespace UserAndBookingService.Services
{
    public interface IAdminUserService
    {
        List<UserAdminDto> GetAllUsers();
        void SetUserStatus(int userId, string status);
    }

}
