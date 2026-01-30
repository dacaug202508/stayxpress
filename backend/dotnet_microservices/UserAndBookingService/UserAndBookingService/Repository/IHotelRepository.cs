using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public interface IHotelRepository
    {
        List<Hotel> GetAll();
        List<Hotel> GetByOwnerId(int ownerId);
        Hotel GetById(int id);
        void Update(Hotel hotel);
    }

}
