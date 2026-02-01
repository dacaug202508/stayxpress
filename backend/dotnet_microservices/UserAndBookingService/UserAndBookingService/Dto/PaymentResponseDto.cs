namespace UserAndBookingService.Dto
{
    public class PaymentResponseDto
    {
        public int PaymentId { get; set; }
        public int BookingId { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentStatus { get; set; } = null!;
        public string TransactionReference { get; set; } = null!;
        public DateTime PaidAt { get; set; }
    }


}
