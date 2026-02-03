import React, { useEffect, useState } from "react";
import CompareGrid from "../../owner/resuable/CompareGrid";
import { getAllHotels } from "../../../services/hotelservice";
import { getRoomsByHotelId } from "../../../services/roomservice";
import { FaExchangeAlt, FaHotel, FaBed } from "react-icons/fa";

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
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* HEADER HERO */}
      <div className="bg-blue-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-4">
          Compare Rooms <FaExchangeAlt className="text-blue-400 text-2xl" />
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Select a hotel and two rooms to compare amenities, sleeping capacity, and pricing side-by-side. Make the best choice for your stay.
        </p>
      </div>

      {/* SELECT SECTION */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">

          {/* HOTEL SELECT */}
          <div className="form-control">
            <label className="label font-bold text-gray-500 uppercase text-xs tracking-wider mb-1">
              <span className="flex items-center gap-2"><FaHotel /> Select Hotel</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl h-12"
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
            >
              <option value="">Choose a hotel...</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotelName} — {hotel.city}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM 1 SELECT */}
          <div className="form-control">
            <label className="label font-bold text-gray-500 uppercase text-xs tracking-wider mb-1">
              <span className="flex items-center gap-2"><FaBed /> Room Option 1</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl h-12"
              disabled={!rooms.length}
              value={room1?.id || ""}
              onChange={(e) => {
                const selected = rooms.find(r => r.id === Number(e.target.value));
                if (selected?.id === room2?.id) return; // prevent duplicate
                setRoom1(selected);
              }}
            >
              <option value="">Choose first room...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomType} • Room {room.roomNumber} • ₹{room.pricePerNight}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM 2 SELECT */}
          <div className="form-control">
            <label className="label font-bold text-gray-500 uppercase text-xs tracking-wider mb-1">
              <span className="flex items-center gap-2"><FaBed /> Room Option 2</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl h-12"
              disabled={!rooms.length}
              value={room2?.id || ""}
              onChange={(e) => {
                const selected = rooms.find(r => r.id === Number(e.target.value));
                if (selected?.id === room1?.id) return; // prevent duplicate
                setRoom2(selected);
              }}
            >
              <option value="">Choose second room...</option>
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
      <div className="max-w-7xl mx-auto px-6 mt-12 transition-all duration-500">
        {room1 || room2 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <CompareGrid room1={room1} room2={room2} />
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <FaExchangeAlt className="text-6xl mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 font-medium">Select a hotel and two rooms to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomCompare;
