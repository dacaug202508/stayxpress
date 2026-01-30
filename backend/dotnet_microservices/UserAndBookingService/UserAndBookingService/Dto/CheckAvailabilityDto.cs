namespace UserAndBookingService.Dto
{
    public class CheckAvailabilityDto
    {
        public int RoomId { get; set; }
        public DateOnly CheckIn { get; set; }
        public DateOnly CheckOut { get; set; }
    }
}
