using System;
using System.Collections.Generic;

namespace UserAndBookingService.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? ProfileImage { get; set; }

    public string Role { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();

    public virtual ICollection<OwnerRequest> OwnerRequestReviewedByNavigations { get; set; } = new List<OwnerRequest>();

    public virtual ICollection<OwnerRequest> OwnerRequestUsers { get; set; } = new List<OwnerRequest>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
