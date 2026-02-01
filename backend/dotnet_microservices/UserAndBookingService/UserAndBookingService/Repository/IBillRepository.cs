namespace UserAndBookingService.Repository
{
    using UserAndBookingService.Models;

    public interface IBillRepository
    {
        Bill Add(Bill bill);
        Bill? GetById(int billId);
        Bill? GetByBookingId(int bookingId);
    }

}
