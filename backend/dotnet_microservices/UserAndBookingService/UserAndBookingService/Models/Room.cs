using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Room
{
    public int Id { get; set; }

    public int HotelId { get; set; }

    public string RoomNumber { get; set; } = null!;

    public string RoomType { get; set; } = null!;

    public decimal PricePerNight { get; set; }

    public int MaxGuests { get; set; }

    public bool IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<BookingExtra> BookingExtras { get; set; } = new List<BookingExtra>();

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<RoomAmenity> RoomAmenities { get; set; } = new List<RoomAmenity>();
}
