import React, { useState } from "react";

function OwnerBooking() {

  // 🔹 Dummy bookings (based on YOUR schema)
  const [bookings] = useState([
    {
      id: 1,
      booking_reference: "BK-2026-001",
      customer_id: 12,
      room_id: 101,
      room_number: "101",
      room_type: "DELUXE",
      hotel_name: "Hotel Sunrise",
      check_in_date: "2026-02-10",
      check_out_date: "2026-02-12",
      booking_status: "BOOKED",
      total_price: 7000,
      created_at: "2026-01-20",
      updated_at: "2026-01-20",
    },
    {
      id: 2,
      booking_reference: "BK-2026-002",
      customer_id: 18,
      room_id: 201,
      room_number: "201",
      room_type: "SUITE",
      hotel_name: "Hotel Ocean View",
      check_in_date: "2026-02-15",
      check_out_date: "2026-02-18",
      booking_status: "BOOKED",
      total_price: 16500,
      created_at: "2026-01-22",
      updated_at: "2026-01-22",
    },
  ]);

  return (
    <div className="w-full min-h-full p-6 bg-sky-50">

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Booked Rooms
      </h1>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">

          <div className="overflow-x-auto">
            <table className="table">

              <thead className="bg-gray-50">
                <tr>
                  <th>#</th>
                  <th>Booking Ref</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b, index) => (
                    <tr key={b.id}>
                      <th>{index + 1}</th>
                      <td className="font-medium">
                        {b.booking_reference}
                      </td>
                      <td>{b.hotel_name}</td>
                      <td>
                        {b.room_number} ({b.room_type})
                      </td>
                      <td>{b.check_in_date}</td>
                      <td>{b.check_out_date}</td>
                      <td>
                        <span className="badge badge-success badge-outline">
                          {b.booking_status}
                        </span>
                      </td>
                      <td>₹{b.total_price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerBooking;
