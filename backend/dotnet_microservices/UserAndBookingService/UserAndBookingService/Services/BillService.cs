using UserAndBookingService.Models;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class BillService : IBillService
    {
        private readonly IBillRepository _repo;
        private readonly HotelbookingContext _context;

        public BillService(IBillRepository repo, HotelbookingContext context)
        {
            _repo = repo;
            _context = context;
        }

        public Bill CreateBill(int bookingId, decimal amount)
        {
            if (!_context.Bookings.Any(b => b.Id == bookingId))
                throw new Exception("Booking does not exist");

            // prevent duplicate bill
            var existing = _repo.GetByBookingId(bookingId);
            if (existing != null)
                return existing;

            var bill = new Bill
            {
                BookingId = bookingId,
                BillName = "Room Booking Bill",
                BaseAmount = amount,
                CreatedAt = DateTime.UtcNow
            };

            _context.Bills.Add(bill);
            _context.SaveChanges();

            return bill;
        }

        public Bill GetBill(int billId)
        {
            throw new NotImplementedException();
        }

        public Bill GetBillByBooking(int bookingId)
        {
            return _repo.GetByBookingId(bookingId)
                   ?? throw new Exception("Bill not found");
        }
    }
}
