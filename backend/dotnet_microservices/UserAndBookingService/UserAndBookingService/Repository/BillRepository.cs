using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public class BillRepository : IBillRepository
    {
        private readonly HotelbookingContext _context;

        public BillRepository(HotelbookingContext context)
        {
            _context = context;
        }

        public Bill Add(Bill bill)
        {
            _context.Bills.Add(bill);
            _context.SaveChanges();
            return bill;
        }

        public Bill? GetById(int billId)
        {
            return _context.Bills.FirstOrDefault(b => b.BillId == billId);
        }

        public Bill? GetByBookingId(int bookingId)
        {
            return _context.Bills.FirstOrDefault(b => b.BookingId == bookingId);
        }
    }
}
