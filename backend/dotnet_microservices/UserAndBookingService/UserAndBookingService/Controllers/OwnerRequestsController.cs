using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [ApiController]
    [Route("api/owner-requests")]
    public class OwnerRequestsController : ControllerBase
    {
        private readonly IOwnerRequestService _service;

        public OwnerRequestsController(IOwnerRequestService service)
        {
            _service = service;
        }

        // POST: api/owner-requests/5
        [HttpPost("{userId}")]
        public IActionResult CreateRequest(int userId)
        {
            _service.CreateOwnerRequest(userId);
            return Ok("Request submitted");
        }
    }

}
