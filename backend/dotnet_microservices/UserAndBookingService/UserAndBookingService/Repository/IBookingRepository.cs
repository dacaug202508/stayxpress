using UserAndBookingService.Models;



namespace UserAndBookingService.Repository
{
    public interface IBookingRepository
    {
        List<Booking> GetRoomBookings(int roomId, DateOnly checkIn, DateOnly checkOut);
        void Add(Booking booking);
        List<Booking> GetByCustomer(int customerId);
        List<Booking> GetByOwner(int ownerId);
        Booking GetById(int id);
        void Update(Booking booking);
    }


}