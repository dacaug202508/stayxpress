import React, { useEffect, useState } from "react";
import { getOwnerBookings } from "../../../services/bookingService";

function OwnerBooking() {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const ownerId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchBookedRooms();
  }, []);

  const fetchBookedRooms = async () => {
    try {
      const res = await getOwnerBookings(ownerId);

      // 🔥 ONLY PAID BOOKINGS
      const paidBookings = res.data.filter(
        (b) => b.status === "COMPLETED"
      );

      setBookedRooms(paidBookings);
    } catch (error) {
      console.error("Error fetching owner bookings", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center">
        Loading paid bookings...
      </div>
    );
  }

  return (
    <div className="w-full min-h-full p-6 bg-sky-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Paid Bookings (Your Hotels)
      </h1>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
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
                </tr>
              </thead>

              <tbody>
                {bookedRooms.length > 0 ? (
                  bookedRooms.map((item, index) => (
                    <tr key={item.bookingId}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{item.bookingReference}</td>
                      <td>{item.roomId}</td>
                      <td>{item.checkIn}</td>
                      <td>{item.checkOut}</td>
                      <td>
                        <span className="badge badge-success">
                          PAID
                        </span>
                      </td>
                      <td className="font-semibold">
                        ₹{item.totalPrice}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No paid bookings found
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
