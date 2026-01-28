import React, { useEffect, useState } from "react";
import { getBookedRoomsByOwner } from "../../../services/bookingService";

function OwnerBooking() {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const ownerId = 1; // 🔴 later replace with JWT / auth

  useEffect(() => {
    fetchBookedRooms();
  }, []);

  const fetchBookedRooms = async () => {
    try {
      const response = await getBookedRoomsByOwner(ownerId);
      setBookedRooms(response.data.data);
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
        Booked Rooms (Owner)
      </h1>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">

              {/* TABLE HEADER */}
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

              {/* TABLE BODY */}
              <tbody>
                {bookedRooms.length > 0 ? (
                  bookedRooms.map((item, index) => (
                    <tr key={item.bookingId}>
                      <th>{index + 1}</th>
                      <td className="font-medium">
                        {item.bookingReference}
                      </td>
                      <td>{item.hotelName}</td>
                      <td>
                        {item.roomNumber} ({item.roomType})
                      </td>
                      <td>{item.checkInDate}</td>
                      <td>{item.checkOutDate}</td>
                      <td>
                        <span className="badge badge-success badge-outline">
                          {item.bookingStatus}
                        </span>
                      </td>
                      <td>₹{item.totalPrice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-gray-500"
                    >
                      No booked rooms found
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
