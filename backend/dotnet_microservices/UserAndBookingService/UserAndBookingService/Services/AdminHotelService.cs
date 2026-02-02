using UserAndBookingService.Repository;
using UserAndBookingService.Dto;

namespace UserAndBookingService.Services
{
    public class AdminHotelService : IAdminHotelService
    {
        private readonly IHotelRepository _repo;

        public AdminHotelService(IHotelRepository repo)
        {
            _repo = repo;
        }

        public List<HotelAdminDto> GetAllHotels() =>
            _repo.GetAll().Select(h => new HotelAdminDto
            {
                Id = h.Id,
                Name = h.HotelName,
                City = h.City,
                Country = h.Country,
                Status = h.Status
            }).ToList();

        public List<HotelAdminDto> GetHotelsByOwner(int ownerId) =>
            _repo.GetByOwnerId(ownerId).Select(h => new HotelAdminDto
            {
                Id = h.Id,
                Name = h.HotelName,
                Status = h.Status,
                City = h.City,
                Country = h.Country,
            }).ToList();

        public void SetHotelStatus(int hotelId, string status)
        {
            var hotel = _repo.GetById(hotelId);
            hotel.Status = status;
            _repo.Update(hotel);
        }
    }

}
