import React, { useEffect, useState } from "react";
import CompareGrid from "../../owner/resuable/CompareGrid";
import { getAllHotels } from "../../../services/hotelservice";
import { getRoomsByHotelId } from "../../../services/roomservice";

function RoomCompare() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [selectedHotel, setSelectedHotel] = useState("");
  const [room1, setRoom1] = useState(null);
  const [room2, setRoom2] = useState(null);

  // 🏨 Load hotels
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllHotels();
        // supports both res.data OR res.data.data
        setHotels(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Error loading hotels", err);
      }
    })();
  }, []);

  // 🛏 Load rooms when hotel changes
  useEffect(() => {
    if (!selectedHotel) {
      setRooms([]);
      return;
    }

    (async () => {
      try {
        const res = await getRoomsByHotelId(selectedHotel);
        // supports both {rooms: []} or []
        const roomList = res.data?.rooms || res.data || [];
        setRooms(roomList);
      } catch (err) {
        console.error("Error loading rooms", err);
      }
    })();
  }, [selectedHotel]);

  // 🔁 Reset selected rooms if hotel changes
  useEffect(() => {
    setRoom1(null);
    setRoom2(null);
  }, [selectedHotel]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold text-gray-900">Compare Rooms</h1>
        <p className="text-gray-600 mt-2">
          Select two rooms to compare features, prices, and amenities side-by-side.
        </p>
      </div>

      {/* SELECT SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* HOTEL SELECT */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Hotel</label>
            <select
              className="select select-bordered w-full"
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
            >
              <option value="">Choose a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotelName} — {hotel.city}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM 1 SELECT */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Room 1</label>
            <select
              className="select select-bordered w-full"
              disabled={!rooms.length}
              value={room1?.id || ""}
              onChange={(e) => {
                const selected = rooms.find(r => r.id === Number(e.target.value));
                if (selected?.id === room2?.id) return; // prevent duplicate
                setRoom1(selected);
              }}
            >
              <option value="">Choose room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomType} • Room {room.roomNumber} • ₹{room.pricePerNight}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM 2 SELECT */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Room 2</label>
            <select
              className="select select-bordered w-full"
              disabled={!rooms.length}
              value={room2?.id || ""}
              onChange={(e) => {
                const selected = rooms.find(r => r.id === Number(e.target.value));
                if (selected?.id === room1?.id) return; // prevent duplicate
                setRoom2(selected);
              }}
            >
              <option value="">Choose room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomType} • Room {room.roomNumber} • ₹{room.pricePerNight}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* COMPARE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <CompareGrid room1={room1} room2={room2} />
      </div>
    </div>
  );
}

export default RoomCompare;
