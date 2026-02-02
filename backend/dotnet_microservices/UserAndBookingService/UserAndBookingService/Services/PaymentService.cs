using UserAndBookingService.Dto;
using UserAndBookingService.Models;
using UserAndBookingService.Repository;

namespace UserAndBookingService.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepo;
        private readonly IBookingRepository _bookingRepo;
        private readonly IBillRepository _billRepo;

        public PaymentService(
            IPaymentRepository paymentRepo,
            IBookingRepository bookingRepo,
            IBillRepository billRepo)
        {
            _paymentRepo = paymentRepo;
            _bookingRepo = bookingRepo;
            _billRepo = billRepo;
        }

        public PaymentResponseDto ProcessPayment(CreatePaymentDto dto)
        {
            var booking = _bookingRepo.GetById(dto.BookingId);
            if (booking == null)
                throw new Exception("Booking not found");

            if (booking.BookingStatus == "COMPLETED")
                throw new Exception("Booking already paid");

            var bill = _billRepo.GetByBookingId(dto.BookingId);
            if (bill == null)
                throw new Exception("Bill not found");

            var payment = new Payment
            {
                BookingId = booking.Id,
                BillId = bill.BillId,
                PaymentMethod = dto.PaymentMethod,
                PaymentStatus = "SUCCESS",
                TotalAmount = bill.BaseAmount,
                TransactionReference = Guid.NewGuid().ToString("N").Substring(0, 12),
                PaidAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            _paymentRepo.Add(payment);

            // ✅ ENUM SAFE
            booking.BookingStatus = "COMPLETED";
            _bookingRepo.Update(booking);

            return new PaymentResponseDto
            {
                PaymentId = payment.PaymentId,
                BookingId = booking.Id,
                TotalAmount = payment.TotalAmount,
                PaymentStatus = payment.PaymentStatus,
                TransactionReference = payment.TransactionReference,
                PaidAt = payment.PaidAt
            };
        }
    }
}
