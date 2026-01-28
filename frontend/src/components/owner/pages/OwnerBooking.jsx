import React, { useEffect, useState } from "react";
import { getBookedRoomsByOwner } from "../../../services/bookingService";
import { getHotelsByOwnerId } from "../../../services/hotelservice";

function OwnerBooking() {
  const ownerId = 1; // later from JWT

  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [bookedRooms, setBookedRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
    fetchBookedRooms();
  }, []);

  // 🔹 Fetch hotels
  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerId(ownerId);
      setHotels(res.data.data);
    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  // 🔹 Fetch booked rooms
  const fetchBookedRooms = async () => {
    try {
      const res = await getBookedRoomsByOwner(ownerId);

      // ✅ only BOOKED / CONFIRMED
      const confirmed = res.data.data.filter(
        (item) =>
          item.bookingStatus === "BOOKED" ||
          item.bookingStatus === "CONFIRMED"
      );

      setBookedRooms(confirmed);
      setFilteredRooms(confirmed);
    } catch (error) {
      console.error("Error fetching booked rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Hotel dropdown change
  const handleHotelChange = (e) => {
    const hotelId = e.target.value;
    setSelectedHotelId(hotelId);

    if (!hotelId) {
      setFilteredRooms(bookedRooms);
    } else {
      const filtered = bookedRooms.filter(
        (room) => room.hotelId === Number(hotelId)
      );
      setFilteredRooms(filtered);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading booked rooms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-sky-900">
          Booked / Confirmed Rooms
        </h2>

        {/* 🔽 HOTEL DROPDOWN */}
        <div className="w-72">
          <select
            className="select select-bordered w-full"
            value={selectedHotelId}
            onChange={handleHotelChange}
          >
            <option value="">All Hotels</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
        </div>

        {/* ROOMS LIST */}
        <div className="space-y-6">
          {filteredRooms.map((item) => (
            <div
              key={item.bookingId}
              className="bg-white rounded-xl shadow-md flex flex-col md:flex-row"
            >
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="Room"
                className="w-full md:w-64 h-48 object-cover"
              />

              <div className="flex-1 p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.hotelName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      🛏 Room {item.roomNumber} ({item.roomType})
                    </p>
                  </div>

                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {item.bookingStatus}
                  </span>
                </div>

                <div className="mt-4 grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Check-In</p>
                    <p>{item.checkInDate}</p>
                  </div>
                  <div>
                    <p className="font-medium">Check-Out</p>
                    <p>{item.checkOutDate}</p>
                  </div>
                  <div>
                    <p className="font-medium">Guests</p>
                    <p>{item.maxGuests}</p>
                  </div>
                  <div>
                    <p className="font-medium">Total</p>
                    <p className="text-sky-600 font-semibold">
                      ₹{item.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No booked rooms for selected hotel
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerBooking;
