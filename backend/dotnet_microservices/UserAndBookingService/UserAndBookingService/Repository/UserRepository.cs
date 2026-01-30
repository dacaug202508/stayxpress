using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly HotelbookingContext _context;

        public UserRepository(HotelbookingContext context)
        {
            _context = context;
        }

        public List<User> GetAll() => _context.Users.ToList();

        public User GetById(int id) =>
            _context.Users.FirstOrDefault(u => u.Id == id);

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }

}
