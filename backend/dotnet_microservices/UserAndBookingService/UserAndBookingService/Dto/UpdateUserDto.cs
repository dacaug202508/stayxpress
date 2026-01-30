namespace UserAndBookingService.Dto
{
    public class UpdateUserDto
    {
        public string FullName { get; set; }
        public IFormFile? ProfileImage { get; set; }
    }
}
