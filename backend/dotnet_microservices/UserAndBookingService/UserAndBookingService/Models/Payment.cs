using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int BillId { get; set; }

    public int BookingId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public decimal TotalAmount { get; set; }

    public string TransactionReference { get; set; } = null!;

    public DateTime PaidAt { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Bill Bill { get; set; } = null!;

    public virtual Booking Booking { get; set; } = null!;
}
