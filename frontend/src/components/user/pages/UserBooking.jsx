import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../../services/bookingService";
import { FaCalendarAlt, FaHotel, FaMoneyBillWave, FaEllipsisV, FaTrashAlt } from "react-icons/fa";

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
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">My Bookings & Payments</h2>
            <p className="text-gray-500">Track your past and upcoming stays</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
            Total Bookings: <span className="text-blue-600 font-bold ml-1">{bookings.length}</span>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-50/50">
                  <tr className="text-gray-500 font-bold uppercase text-xs tracking-wider border-b border-gray-100">
                    <th className="py-5 pl-6">#</th>
                    <th>Booking Ref</th>
                    <th>Room ID</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th className="pr-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {bookings.map((b, index) => (
                    <tr key={b.bookingId} className="hover:bg-blue-50/30 transition-colors">
                      <td className="font-bold text-gray-400 pl-6">{index + 1}</td>
                      <td>
                        <div className="font-semibold text-gray-800">{b.bookingReference}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaHotel className="text-gray-400" />
                          {b.roomId}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-400" />
                          {b.checkIn}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          {b.checkOut}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${b.status === "COMPLETED"
                              ? "bg-green-50 text-green-600 border-green-100"
                              : b.status === "CONFIRMED"
                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                : b.status === "CANCELLED"
                                  ? "bg-red-50 text-red-600 border-red-100"
                                  : "bg-gray-50 text-gray-600 border-gray-100"
                            }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="font-bold text-gray-800">₹{b.totalPrice}</td>

                      {/* Actions */}
                      <td className="pr-6 text-right">
                        {b.status === "CONFIRMED" ? (
                          <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm hover:bg-gray-100">
                              <FaEllipsisV className="text-gray-400" />
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow-xl bg-white rounded-xl w-48 border border-gray-100 z-50 text-sm"
                            >
                              <li>
                                <button
                                  onClick={() => handleCancelBooking(b.bookingId)}
                                  className="text-red-500 font-medium hover:bg-red-50 rounded-lg py-3"
                                >
                                  <FaTrashAlt />
                                  Cancel Booking
                                </button>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="text-gray-300 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
              <p className="text-gray-500">You haven't made any reservations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserBookings;
