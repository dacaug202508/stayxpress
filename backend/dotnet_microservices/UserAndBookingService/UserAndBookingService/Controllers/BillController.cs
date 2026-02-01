using Microsoft.AspNetCore.Mvc;
using UserAndBookingService.Services;

namespace UserAndBookingService.Controllers
{
    [Route("api/bills")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillService _service;

        public BillController(IBillService service)
        {
            _service = service;
        }

        // 🔍 Get bill by booking
        // GET: api/bills/booking/5
        [HttpGet("booking/{bookingId}")]
        public IActionResult GetBillByBooking(int bookingId)
        {
            return Ok(_service.GetBillByBooking(bookingId));
        }

        // 🔍 Get bill by bill id
        // GET: api/bills/3
        [HttpGet("{billId}")]
        public IActionResult GetBill(int billId)
        {
            return Ok(_service.GetBill(billId));
        }
    }
}
