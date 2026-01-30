using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class RoomAmenity
{
    public int Id { get; set; }

    public int RoomId { get; set; }

    public int AmenityId { get; set; }

    public virtual Amenity Amenity { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;
}
