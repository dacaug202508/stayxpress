using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class BookingExtra
{
    public int Id { get; set; }

    public int BookingId { get; set; }

    public int HotelId { get; set; }

    public int RoomId { get; set; }

    public int ServiceId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal TotalPrice { get; set; }

    public string PurchaseStatus { get; set; } = null!;

    public DateTime? OrderedAt { get; set; }

    public virtual Booking Booking { get; set; } = null!;

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;

    public virtual HotelService Service { get; set; } = null!;
}
