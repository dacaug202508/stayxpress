namespace UserAndBookingService.Dto
{
    public class CreateBookingDto
    {
        public int CustomerId { get; set; }
        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public DateOnly CheckIn { get; set; }
        public DateOnly CheckOut { get; set; }
    }

}
