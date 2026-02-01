using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly HotelbookingContext _context;

        public PaymentRepository(HotelbookingContext context)
        {
            _context = context;
        }

        public Payment Add(Payment payment)
        {
            _context.Payments.Add(payment);
            _context.SaveChanges();
            return payment;
        }

        public Payment? GetByBookingId(int bookingId)
        {
            return _context.Payments.FirstOrDefault(p => p.BookingId == bookingId);
        }
    }


}
