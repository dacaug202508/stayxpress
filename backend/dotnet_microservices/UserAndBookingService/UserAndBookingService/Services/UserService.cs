using UserAndBookingService.Dto;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IWebHostEnvironment _env;

        public UserService(IUserRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
            _env = env;
        }

        public UserProfileDto GetUserById(int id)
        {
            var user = _repo.GetById(id);
            if (user == null) return null;

            return new UserProfileDto
            {
                Id = user.Id,
                FullName = user.Username,
                Email = user.Email,
                Role = user.Role,
                ProfileImage = user.ProfileImage
            };
        }

        public void UpdateUser(int id, UpdateUserDto dto)
        {
            var user = _repo.GetById(id);
            if (user == null) throw new Exception("User not found");

            user.Username = dto.FullName;

            if (dto.ProfileImage != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "profiles");
                Directory.CreateDirectory(uploads);

                var filePath = Path.Combine(uploads, dto.ProfileImage.FileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                dto.ProfileImage.CopyTo(stream);

                user.ProfileImage = $"/profiles/{dto.ProfileImage.FileName}";
            }

            _repo.Update(user);
        }
    }

}
