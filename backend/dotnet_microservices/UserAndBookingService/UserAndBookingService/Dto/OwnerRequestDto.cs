namespace UserAndBookingService.Dto
{
    public class OwnerRequestDto
    {
        public int RequestId { get; set; }
        public int UserId { get; set; }
        public DateTime? RequestedAt { get; set; }
        public string Status { get; internal set; }
    }
}
