using UserAndBookingService.Models;

namespace UserAndBookingService.Services
{
    public interface IBillService
    {
        Bill CreateBill(int bookingId, decimal amount);
        Bill GetBillByBooking(int bookingId);
        Bill GetBill(int billId);
    }
}
