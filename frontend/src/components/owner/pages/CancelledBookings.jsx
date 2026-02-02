import React, { useEffect, useState } from "react";
import { getOwnerBookings } from "../../../services/bookingService";

function CancelledBookings() {
  const ownerId = localStorage.getItem("user_id");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCancelledBookings();
  }, []);

  const fetchCancelledBookings = async () => {
    try {
      const res = await getOwnerBookings(ownerId);

      // ✅ Filter only cancelled bookings
      const cancelled = res.data.filter(
        (b) => b.status === "CANCELLED"
      );

      setBookings(cancelled);
    } catch (error) {
      console.error("Error fetching cancelled bookings", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cancelled bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Cancelled Bookings
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="table">
          <thead className="bg-gray-50">
            <tr>
              <th>#</th>
              <th>Booking Ref</th>
              <th>Room ID</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b, index) => (
                <tr key={b.bookingId}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{b.bookingReference}</td>
                  <td>{b.roomId}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>
                    <span className="badge badge-error">
                      CANCELLED
                    </span>
                  </td>
                  <td className="font-semibold">₹{b.totalPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No cancelled bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CancelledBookings;
