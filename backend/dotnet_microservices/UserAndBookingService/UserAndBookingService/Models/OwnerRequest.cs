using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class OwnerRequest
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string RequestStatus { get; set; } = null!;

    public DateTime? RequestedAt { get; set; }

    public DateTime? ReviewedAt { get; set; }

    public int? ReviewedBy { get; set; }

    public virtual User? ReviewedByNavigation { get; set; }

    public virtual User User { get; set; } = null!;
}
