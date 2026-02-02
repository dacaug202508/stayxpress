using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Dto;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _service;

        public PaymentController(IPaymentService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult MakePayment(CreatePaymentDto dto)
        {
            var result = _service.ProcessPayment(dto);
            return Ok(result);
        }
    }
}
