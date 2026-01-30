using UserAndBookingService.Dto;
using UserAndBookingService.Models;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _repo;
        private readonly HotelbookingContext _context;

        public BookingService(IBookingRepository repo, HotelbookingContext context)
        {
            _repo = repo;
            _context = context;
        }

        public bool IsRoomAvailable(CheckAvailabilityDto dto)
        {
            return !_repo.GetRoomBookings(dto.RoomId, dto.CheckIn, dto.CheckOut).Any();
        }

        public BookingResponseDto CreateBooking(CreateBookingDto dto)
        {
            if (!IsRoomAvailable(new CheckAvailabilityDto
            {
                RoomId = dto.RoomId,
                CheckIn = dto.CheckIn,
                CheckOut = dto.CheckOut
            }))
                throw new Exception("Room not available");

            var room = _context.Rooms.First(r => r.Id == dto.RoomId);
            var nights = dto.CheckOut.DayNumber - dto.CheckIn.DayNumber;
            var total = nights * room.PricePerNight;

            var booking = new Booking
            {
                BookingReference = Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                CustomerId = dto.CustomerId,
                HotelId = dto.HotelId,
                RoomId = dto.RoomId,
                CheckInDate = dto.CheckIn,
                CheckOutDate = dto.CheckOut,

                BookingStatus = "CONFIRMED",
                TotalPrice = total
            };

            _repo.Add(booking);

            return new BookingResponseDto
            {
                BookingId = booking.Id,
                BookingReference = booking.BookingReference,
                RoomId = booking.RoomId,
                CheckIn = dto.CheckIn,
                CheckOut = dto.CheckOut,
                TotalPrice = total,
                Status = booking.BookingStatus
            };
        }

        public List<BookingResponseDto> GetUserBookings(int userId) =>
            _repo.GetByCustomer(userId)
                .Select(b => new BookingResponseDto
                {
                    BookingId = b.Id,
                    BookingReference = b.BookingReference,
                    RoomId = b.RoomId,
                    CheckIn = b.CheckInDate,
                    HotelId = b.HotelId,
                    CheckOut = b.CheckOutDate,
                    TotalPrice = b.TotalPrice,
                    Status = b.BookingStatus
                }).ToList();

        public List<BookingResponseDto> GetOwnerBookings(int ownerId) =>
            _repo.GetByOwner(ownerId)
                .Select(b => new BookingResponseDto
                {
                    BookingId = b.Id,
                    BookingReference = b.BookingReference,
                    RoomId = b.RoomId,
                    CheckIn = b.CheckInDate,
                    HotelId = b.HotelId,
                    CheckOut = b.CheckOutDate,
                    TotalPrice = b.TotalPrice,
                    Status = b.BookingStatus
                }).ToList();

        public void CancelBooking(int bookingId)
        {
            var booking = _repo.GetById(bookingId);
            if (booking == null) throw new Exception("Booking not found");

            booking.BookingStatus = "CANCELLED";
            _repo.Update(booking);
        }




    }

}
