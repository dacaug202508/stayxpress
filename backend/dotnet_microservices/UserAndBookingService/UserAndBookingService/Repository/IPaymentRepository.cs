using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public interface IPaymentRepository
    {
        Payment Add(Payment payment);
        Payment? GetByBookingId(int bookingId);
    }

}
