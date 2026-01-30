namespace UserAndBookingService.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using UserAndBookingService.Dto;
    using UserAndBookingService.Repository;
    using UserAndBookingService.Services;

    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _service.GetUserById(id);
            return user == null ? NotFound() : Ok(user);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromForm] UpdateUserDto dto)
        {
            _service.UpdateUser(id, dto);
            return NoContent();
        }
    }

}
