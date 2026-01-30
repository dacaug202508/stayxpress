using UserAndBookingService.Models;

namespace UserAndBookingService.Repository
{
    public class OwnerRequestRepository : IOwnerRequestRepository
    {
        private readonly HotelbookingContext _context;

        public OwnerRequestRepository(HotelbookingContext context)
        {
            _context = context;
        }

        public List<OwnerRequest> GetPendingRequests() =>
            _context.OwnerRequests
                .Where(r => r.RequestStatus == "PENDING")
                .ToList();

        public OwnerRequest GetById(int id) =>
            _context.OwnerRequests.FirstOrDefault(r => r.Id == id);

        public void Update(OwnerRequest request)
        {
            _context.OwnerRequests.Update(request);
            _context.SaveChanges();
        }

        public List<OwnerRequest> GetAll()
        {
            return _context.OwnerRequests.ToList();
        }

        public IEnumerable<OwnerRequest> GetByUserId(int userId) =>
    _context.OwnerRequests.Where(r => r.UserId == userId).ToList();

        public void Add(OwnerRequest request)
        {
            _context.OwnerRequests.Add(request);
            _context.SaveChanges();
        }


    }



}
