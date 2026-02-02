using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [ApiController]
    [Route("api/admin/owner-requests")]
    public class AdminOwnerRequestsController : ControllerBase
    {
        private readonly IAdminOwnerRequestService _service;

        public AdminOwnerRequestsController(IAdminOwnerRequestService service)
        {
            _service = service;
        }

        [HttpGet("pending")]
        public IActionResult GetPending() => Ok(_service.GetPendingRequests());

        [HttpPatch("{requestId}/status")]
        public IActionResult UpdateStatus(int requestId, [FromQuery] string status, [FromQuery] int adminId)
        {
            _service.UpdateRequestStatus(requestId, status, adminId);
            return NoContent();
        }


        [HttpGet]
        public IActionResult GetAllRequests()
        {
            return Ok(_service.GetAllRequests());
        }




    }

}
