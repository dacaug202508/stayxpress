using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Amenity
{
    public int Id { get; set; }

    public string AmenityName { get; set; } = null!;

    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<RoomAmenity> RoomAmenities { get; set; } = new List<RoomAmenity>();
}
