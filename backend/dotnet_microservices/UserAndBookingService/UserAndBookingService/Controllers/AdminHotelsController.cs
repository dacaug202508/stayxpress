using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [ApiController]
    [Route("api/admin/hotels")]
    public class AdminHotelsController : ControllerBase
    {
        private readonly IAdminHotelService _service;

        public AdminHotelsController(IAdminHotelService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetAllHotels());

        [HttpGet("owner/{ownerId}")]
        public IActionResult GetByOwner(int ownerId) =>
            Ok(_service.GetHotelsByOwner(ownerId));

        [HttpPatch("{id}/status")]
        public IActionResult SetStatus(int id, string status)
        {
            _service.SetHotelStatus(id, status);
            return NoContent();
        }

        [HttpPatch("{hotelId}/approve")]
        public IActionResult ApproveHotel(int hotelId, [FromQuery] int adminId)
        {
            _service.ApproveHotel(hotelId, adminId);
            return Ok("Hotel approved");
        }

        
        [HttpPatch("{hotelId}/reject")]
        public IActionResult RejectHotel(int hotelId, [FromQuery] int adminId)
        {
            _service.RejectHotel(hotelId, adminId);
            return Ok("Hotel rejected");
        }




    }

}
