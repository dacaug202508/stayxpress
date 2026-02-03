import React, { useEffect, useState } from "react";
import { getOwnerBookings } from "../../../services/bookingService";
import {
  FaCalendarAlt,
  FaSearch,
  FaTimesCircle,
  FaHashtag
} from "react-icons/fa";
import { TbZoomCancelFilled } from "react-icons/tb";
import { toast } from "react-toastify";

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
      toast.error("Failed to load cancelled bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-6 md:p-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span className="p-2 bg-red-100 text-red-600 rounded-xl">
            <TbZoomCancelFilled size={24} />
          </span>
          Cancelled Bookings
        </h1>
        <p className="text-gray-500 mt-1 ml-1">Archive of cancelled reservations</p>
      </div>

      {/* TABLE CARD */}
      <div className="card bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <h2 className="font-bold text-gray-700">Cancellation History</h2>
          <span className="badge badge-error badge-soft font-medium">{bookings.length} Archives</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 pl-6 text-left rounded-none">#</th>
                <th className="py-4">Booking Ref</th>
                <th className="py-4">Room ID</th>
                <th className="py-4">Check-In</th>
                <th className="py-4">Check-Out</th>
                <th className="py-4 text-center">Status</th>
                <th className="py-4 pr-6 text-right rounded-none">Total Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-20 text-gray-400">
                    <div className="loading loading-spinner text-red-500 mb-2"></div>
                    <p>Loading cancellations...</p>
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((b, index) => (
                  <tr key={b.bookingId} className="hover:bg-red-50/50 transition-colors border-b border-gray-50 last:border-none">
                    <th className="pl-6 text-gray-400 font-normal">{index + 1}</th>
                    <td className="font-medium flex items-center gap-2">
                      <FaHashtag className="text-gray-300 text-xs" />
                      {b.bookingReference}
                    </td>
                    <td className="text-gray-600">{b.roomId}</td>
                    <td className="text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-300" />
                        {b.checkIn}
                      </div>
                    </td>
                    <td className="text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-300" />
                        {b.checkOut}
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 flex items-center justify-center gap-1 w-fit mx-auto">
                        <FaTimesCircle size={12} />
                        CANCELLED
                      </span>
                    </td>
                    <td className="pr-6 text-right font-bold text-gray-800">
                      ₹{b.totalPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-24">
                    <div className="flex flex-col items-center justify-center text-gray-300">
                      <FaSearch className="text-5xl mb-4" />
                      <p className="text-lg font-medium text-gray-500">No cancelled bookings</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CancelledBookings;
