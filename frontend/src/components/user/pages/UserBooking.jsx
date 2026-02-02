import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../../services/bookingService";

function UserBookings() {
  const userId = localStorage.getItem("user_id");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getUserBookings(userId);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching user bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await cancelBooking(bookingId);
      fetchBookings(); // refresh table
    } catch (error) {
      alert("Failed to cancel booking");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Bookings & Payments
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-gray-50">
            <tr>
              <th>#</th>
              <th>Booking Ref</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
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
                    <span
                      className={`badge ${
                        b.status === "COMPLETED"
                          ? "badge-success"
                          : b.status === "CONFIRMED"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="font-semibold">₹{b.totalPrice}</td>

                  {/* Actions */}
                  <td>
                    {b.status === "CONFIRMED" ? (
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm btn-outline">
                          ⋮
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
                        >
                          <li>
                            <button
                              onClick={() => handleCancelBooking(b.bookingId)}
                              className="text-red-500"
                            >
                              Cancel Booking
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-6">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserBookings;
