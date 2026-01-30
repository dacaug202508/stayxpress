using UserAndBookingService.Dto;

namespace UserAndBookingService.Repository
{
    public interface IUserService
    {
        UserProfileDto GetUserById(int id);
        void UpdateUser(int id, UpdateUserDto dto);
    }
}
