using UserAndBookingService.Dto;

namespace UserAndBookingService.Services
{
    public interface IPaymentService
    {
        PaymentResponseDto ProcessPayment(CreatePaymentDto dto);
    }


}
