using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Booking
{
    public int Id { get; set; }

    public string BookingReference { get; set; } = null!;

    public int CustomerId { get; set; }

    public int HotelId { get; set; }

    public int RoomId { get; set; }

    public DateOnly CheckInDate { get; set; }

    public DateOnly CheckOutDate { get; set; }

    public string BookingStatus { get; set; } = null!;

    public decimal TotalPrice { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();

    public virtual ICollection<BookingExtra> BookingExtras { get; set; } = new List<BookingExtra>();

    public virtual User Customer { get; set; } = null!;

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Room Room { get; set; } = null!;
}
