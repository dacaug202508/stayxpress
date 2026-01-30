using UserAndBookingService.Dto;

namespace UserAndBookingService.Services
{
    public interface IBookingService
    {
        bool IsRoomAvailable(CheckAvailabilityDto dto);
        BookingResponseDto CreateBooking(CreateBookingDto dto);
        List<BookingResponseDto> GetUserBookings(int userId);
        List<BookingResponseDto> GetOwnerBookings(int ownerId);
        void CancelBooking(int bookingId);
    }

}
