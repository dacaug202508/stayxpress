using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Hotel
{
    public int Id { get; set; }

    public int OwnerId { get; set; }

    public string HotelName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<BookingExtra> BookingExtras { get; set; } = new List<BookingExtra>();

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<HotelService> HotelServices { get; set; } = new List<HotelService>();

    public virtual User Owner { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
