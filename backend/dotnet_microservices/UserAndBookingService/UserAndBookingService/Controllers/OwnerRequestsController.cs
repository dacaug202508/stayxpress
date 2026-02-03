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

        // USER → Create request
        [HttpPost("{userId}")]
        public IActionResult CreateRequest(int userId)
        {
            _service.CreateOwnerRequest(userId);
            return Ok("Request submitted");
        }

        // ADMIN → All requests
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllRequests());
        }

        // ADMIN → Pending only
        [HttpGet("pending")]
        public IActionResult GetPending()
        {
            return Ok(_service.GetPendingRequests());
        }

        // ADMIN → Approve / Reject
        [HttpPut("{requestId}/status")]
        public IActionResult UpdateStatus(
            int requestId,
            [FromQuery] string status,
            [FromQuery] int adminId)
        {
            _service.UpdateStatus(requestId, status, adminId);
            return Ok("Status updated");
        }
    }
}
