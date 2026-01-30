namespace UserAndBookingService.Dto
{
    public class BookingResponseDto
    {
        public int BookingId { get; set; }
        public string BookingReference { get; set; }

        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public DateOnly CheckIn { get; set; }
        public DateOnly CheckOut { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }

}
