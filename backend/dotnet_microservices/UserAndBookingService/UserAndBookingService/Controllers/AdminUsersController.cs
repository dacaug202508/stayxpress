using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    public class AdminUsersController : ControllerBase
    {
        private readonly IAdminUserService _service;

        public AdminUsersController(IAdminUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetAllUsers());

        [HttpPatch("{id}/status")]
        public IActionResult SetStatus(int id, string status)
        {
            _service.SetUserStatus(id, status);
            return NoContent();
        }
    }

}
