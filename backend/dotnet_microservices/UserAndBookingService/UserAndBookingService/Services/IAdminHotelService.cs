using UserAndBookingService.Dto;

namespace UserAndBookingService.Services
{
    public interface IAdminHotelService
    {
        List<HotelAdminDto> GetAllHotels();
        List<HotelAdminDto> GetHotelsByOwner(int ownerId);
        void SetHotelStatus(int hotelId, string status);
    }

}
