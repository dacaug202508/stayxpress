using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetById(int id);
        void Update(User user);
    }

}
