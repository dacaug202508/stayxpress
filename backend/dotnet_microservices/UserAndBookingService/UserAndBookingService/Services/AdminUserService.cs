using UserAndBookingService.Dto;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class AdminUserService : IAdminUserService
    {
        private readonly IUserRepository _repo;

        public AdminUserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public List<UserAdminDto> GetAllUsers() =>
            _repo.GetAll()
                .Select(u => new UserAdminDto
                {
                    Id = u.Id,
                    FullName = u.Username,
                    Email = u.Email,
                    Role = u.Role,
                    Status = u.Status
                }).ToList();

        public void SetUserStatus(int userId, string status)
        {
            var user = _repo.GetById(userId);
            user.Status = status;
            _repo.Update(user);
        }
    }

}
