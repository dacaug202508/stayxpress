import React, { useEffect, useState } from "react";
import { getOwnerBookings } from "../../../services/bookingService";

function OwnerBooking() {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const ownerId = localStorage.getItem("user_id"); // later from JWT

  useEffect(() => {
    fetchBookedRooms();
  }, []);

  const fetchBookedRooms = async () => {
    try {
      console.log("ownerId" + ownerId);
      const response = await getOwnerBookings(ownerId);
      setBookedRooms(response.data); // ✅ backend returns array directly
    } catch (error) {
      console.error("Error fetching booked rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center">
        Loading booked rooms...
      </div>
    );
  }

  return (
    <div className="w-full min-h-full p-6 bg-sky-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Bookings for Your Hotels
      </h1>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>#</th>
                  <th>Booking Ref</th>
                  <th>Room ID</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {bookedRooms.length > 0 ? (
                  bookedRooms.map((item, index) => (
                    <tr key={item.bookingId}>
                      <th>{index + 1}</th>
                      <td className="font-medium">{item.bookingReference}</td>
                      <td>{item.roomId}</td>
                      <td>{item.checkIn}</td>
                      <td>{item.checkOut}</td>
                      <td>
                        <span
                          className={`badge badge-outline ${
                            item.status === "CONFIRMED"
                              ? "badge-success"
                              : item.status === "COMPLETED"
                              ? "badge-info"
                              : "badge-error"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>₹{item.totalPrice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
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
