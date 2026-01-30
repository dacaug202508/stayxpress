import React, { useEffect, useState } from "react";
import { getBookedRoomsByOwner } from "../../../services/bookingService";
import { getHotelsByOwnerAdmin } from "../../../services/adminHotelService";

function OwnerBooking() {
  const ownerId = localStorage.getItem("user_id");

  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerAdmin(ownerId);
      console.log(res.data)
      setHotels(res.data)
    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await getBookedRoomsByOwner(ownerId);
      console.log(res.data)
      // Backend field = status
      const confirmed = res.data.filter((b) => b.status === "CONFIRMED");

      setBookings(confirmed);
      setFilteredBookings(confirmed);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelChange = (e) => {
    const hotelId = e.target.value;
    setSelectedHotelId(hotelId);

    if (!hotelId) {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((b) => b.hotelId === Number(hotelId))
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-sky-900">Confirmed Bookings</h2>

        <div className="w-72">
          <select
            className="select select-bordered w-full"
            value={selectedHotelId}
            onChange={handleHotelChange}
          >
            <option value="">All Hotels</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredBookings.map((item) => (
            <div
              key={item.bookingId}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    Booking Ref: {item.bookingReference}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Room ID: {item.roomId}
                  </p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {item.status}
                </span>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Check-In</p>
                  <p>{item.checkIn}</p>
                </div>
                <div>
                  <p className="font-medium">Check-Out</p>
                  <p>{item.checkOut}</p>
                </div>
                <div>
                  <p className="font-medium">Total</p>
                  <p className="text-sky-600 font-semibold">
                    ₹{item.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No confirmed bookings found
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerBooking;
