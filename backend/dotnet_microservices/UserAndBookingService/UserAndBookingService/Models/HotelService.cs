using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class HotelService
{
    public int Id { get; set; }

    public int HotelId { get; set; }

    public string ServiceName { get; set; } = null!;

    public string ServiceType { get; set; } = null!;

    public decimal Price { get; set; }

    public bool IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<BookingExtra> BookingExtras { get; set; } = new List<BookingExtra>();

    public virtual Hotel Hotel { get; set; } = null!;
}
