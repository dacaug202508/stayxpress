using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Review
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int HotelId { get; set; }

    public int RoomId { get; set; }

    public int Rating { get; set; }

    public string Comment { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;
}
