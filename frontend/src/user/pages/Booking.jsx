import React from "react";
import Button from "../../components/reusable/Button";
import { useNavigate } from "react-router-dom";

function UserBookings() {
  
  let navigate = useNavigate()
  
    // Dummy bookings (later from backend)

  const bookings = [
    {
      id: "BK001",
      hotel: "Oceanview Paradise Resort",
      location: "Maldives",
      checkIn: "2026-02-10",
      checkOut: "2026-02-15",
      guests: 2,
      status: "CONFIRMED",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b9?w=800",
    },
    {
      id: "BK002",
      hotel: "Grand City Plaza",
      location: "New York, USA",
      checkIn: "2026-03-01",
      checkOut: "2026-03-05",
      guests: 1,
      status: "COMPLETED",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    },
    {
      id: "BK003",
      hotel: "Alpine Retreat & Spa",
      location: "Swiss Alps",
      checkIn: "2026-04-12",
      checkOut: "2026-04-18",
      guests: 3,
      status: "CANCELLED",
      price: 990,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
  ];

  const handleCancel = (booking) => {
    console.log("❌ Cancel booking:", booking);
  };

  const handleViewDetails = (booking) => {
    console.log("📄 View booking details:", booking);
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-sky-900 mb-8">My Bookings</h2>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image */}
              <img
                src={booking.image}
                alt={booking.hotel}
                className="w-full md:w-64 h-48 object-cover"
              />

              {/* Details */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {booking.hotel}
                      </h3>
                      <p className="text-sm text-gray-500">
                        📍 {booking.location}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-700">Check-In</p>
                      <p>{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Check-Out</p>
                      <p>{booking.checkOut}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Guests</p>
                      <p>{booking.guests}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Total Price</p>
                      <p className="text-sky-600 font-semibold">
                        ${booking.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Button
                  text={" View Details"}
                    onClick={() => navigate(`/user/bookings/${booking.id}`)}
                    css="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg text-sm font-medium hover:bg-sky-200 transition"
                  />
                   

                  {booking.status === "CONFIRMED" && (
                    <Button
                    text={" Cancel Booking"}
                      onClick={() => handleCancel(booking)}
                      css="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    
                />
                     
                
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            You don’t have any bookings yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookings;
