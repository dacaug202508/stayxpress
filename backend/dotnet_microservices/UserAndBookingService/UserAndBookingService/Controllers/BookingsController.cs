using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Dto;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _service;

        public BookingsController(IBookingService service)
        {
            _service = service;
        }

        [HttpPost("availability")]
        public IActionResult CheckAvailability([FromBody] CheckAvailabilityDto dto) =>
            Ok(_service.IsRoomAvailable(dto));
        [HttpPost]
        public IActionResult CreateBooking([FromBody] CreateBookingDto dto)
        {
            var result = _service.CreateBooking(dto);
            return Ok(result);
        }


        [HttpGet("user/{userId}")]
        public IActionResult UserBookings(int userId) =>
            Ok(_service.GetUserBookings(userId));

        [HttpGet("owner/{ownerId}")]
        public IActionResult OwnerBookings(int ownerId) =>
            Ok(_service.GetOwnerBookings(ownerId));

        [HttpPatch("{id}/cancel")]
        public IActionResult Cancel(int id)
        {
            _service.CancelBooking(id);
            return NoContent();
        }
    }

}
