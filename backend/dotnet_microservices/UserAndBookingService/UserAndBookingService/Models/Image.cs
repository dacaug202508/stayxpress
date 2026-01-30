using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class Image
{
    public int ImageId { get; set; }

    public string EntityType { get; set; } = null!;

    public int EntityId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool? IsPrimary { get; set; }

    public DateTime? UploadedAt { get; set; }
}
