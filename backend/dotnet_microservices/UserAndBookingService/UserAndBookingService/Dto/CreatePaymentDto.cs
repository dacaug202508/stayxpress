namespace UserAndBookingService.Dto
{
    public class CreatePaymentDto
    {
        public int BookingId { get; set; }
        public int BillId { get; set; }
        public string PaymentMethod { get; set; } = null!;
    }

}
