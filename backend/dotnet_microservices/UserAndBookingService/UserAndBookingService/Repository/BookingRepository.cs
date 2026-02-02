using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly HotelbookingContext _context;

        public BookingRepository(HotelbookingContext context)
        {
            _context = context;
        }

        public List<Booking> GetRoomBookings(int roomId, DateOnly checkIn, DateOnly checkOut)
        {
            return _context.Bookings
                .Where(b => b.RoomId == roomId &&
                   !(checkOut <= b.CheckInDate ||
                checkIn >= b.CheckOutDate))

                .ToList();
        }

        public void Add(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public List<Booking> GetByCustomer(int customerId) =>
            _context.Bookings.Where(b => b.CustomerId == customerId).ToList();

        public List<Booking> GetByOwner(int ownerId) =>
            _context.Bookings.Where(b => b.Hotel.OwnerId == ownerId).ToList();

        public Booking GetById(int id) =>
            _context.Bookings.FirstOrDefault(b => b.Id == id);

        public void Update(Booking booking)
        {
            var existing = _context.Bookings.Find(booking.Id);
            if (existing == null) return;

            existing.BookingStatus = booking.BookingStatus;
            _context.SaveChanges();
        }

    }

}
