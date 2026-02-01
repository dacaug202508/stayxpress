using Microsoft.AspNetCore.Mvc;
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

            var bill = _billRepo.GetById(dto.BillId);
            if (bill == null)
                throw new Exception("Bill not found");

            if (booking.BookingStatus == "COMPLETED")
                throw new Exception("Booking already paid");

            // 🔥 Simulate payment gateway
            var payment = new Payment
            {
                BookingId = dto.BookingId,
                BillId = dto.BillId,
                PaymentMethod = dto.PaymentMethod,
                PaymentStatus = "SUCCESS",
                TotalAmount = bill.BaseAmount,
                TransactionReference = Guid.NewGuid().ToString().Substring(0, 12),
                PaidAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            payment = _paymentRepo.Add(payment);

            // ✅ Update booking status
            booking.BookingStatus = "CONFIRMED";
            _bookingRepo.Update(booking);

            return new PaymentResponseDto
            {
                PaymentId = payment.PaymentId,
                BookingId = payment.BookingId,
                TotalAmount = payment.TotalAmount,
                PaymentStatus = payment.PaymentStatus,
                TransactionReference = payment.TransactionReference,
                PaidAt = payment.PaidAt
            };
        }
    }


}
