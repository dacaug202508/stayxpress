using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Bill
{
    public int BillId { get; set; }

    public int BookingId { get; set; }

    public string BillName { get; set; } = null!;

    public decimal BaseAmount { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Booking Booking { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
