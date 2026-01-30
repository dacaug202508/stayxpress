using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public class HotelRepository : IHotelRepository
    {
        private readonly HotelbookingContext _context;

        public HotelRepository(HotelbookingContext context)
        {
            _context = context;
        }

        public List<Hotel> GetAll() => _context.Hotels.ToList();

        public List<Hotel> GetByOwnerId(int ownerId) =>
            _context.Hotels.Where(h => h.OwnerId == ownerId).ToList();

        public Hotel GetById(int id) =>
            _context.Hotels.FirstOrDefault(h => h.Id == id);

        public void Update(Hotel hotel)
        {
            _context.Hotels.Update(hotel);
            _context.SaveChanges();
        }
    }

}
