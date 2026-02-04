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
        console.log(roomList);
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
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      {/* HEADER HERO */}
      <div className="relative py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex justify-center items-center gap-4 drop-shadow-lg">
            Compare & Choose
            <FaExchangeAlt className="text-blue-300 text-3xl opacity-80" />
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Select a hotel and two rooms to compare amenities, sleeping capacity, and pricing side-by-side.
          </p>
        </div>
      </div>

      {/* SELECT SECTION */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-100/50 ring-1 ring-gray-200/50">

          {/* HOTEL SELECT */}
          <div className="form-control group">
            <label className="label font-bold text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-blue-600 transition-colors">
              <span className="flex items-center gap-2"><FaHotel /> Select Hotel</span>
            </label>
            <div className="relative">
              <select
                className="select select-bordered w-full bg-gray-50 hover:bg-white text-gray-700 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 rounded-xl h-14 pl-4 pr-10 text-base font-medium transition-all shadow-sm"
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
              >
                <option value="">-- Choose a hotel --</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.hotelName} — {hotel.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ROOM 1 SELECT */}
          <div className="form-control group">
            <label className="label font-bold text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-blue-600 transition-colors">
              <span className="flex items-center gap-2"><FaBed /> Room Option A</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 hover:bg-white text-gray-700 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 rounded-xl h-14 pl-4 text-base font-medium transition-all shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={!rooms.length}
              value={room1?.id || ""}
              onChange={(e) => {
                const selected = rooms.find(r => r.id === Number(e.target.value));
                if (selected?.id === room2?.id) return; // prevent duplicate
                setRoom1(selected);
              }}
            >
              <option value="">-- First Room --</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id} disabled={room.id === room2?.id}>
                  {room.roomType} • ₹{room.pricePerNight}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM 2 SELECT */}
          <div className="form-control group">
            <label className="label font-bold text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-blue-600 transition-colors">
              <span className="flex items-center gap-2"><FaBed /> Room Option B</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 hover:bg-white text-gray-700 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 rounded-xl h-14 pl-4 text-base font-medium transition-all shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={!rooms.length}
              value={room2?.id || ""}
              onChange={(e) => {
                const selected = rooms.find(r => r.id === Number(e.target.value));
                if (selected?.id === room1?.id) return; // prevent duplicate
                setRoom2(selected);
              }}
            >
              <option value="">-- Second Room --</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id} disabled={room.id === room1?.id}>
                  {room.roomType} • ₹{room.pricePerNight}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* COMPARE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-16 transition-all duration-700 ease-in-out">
        {room1 || room2 ? (
          <CompareGrid room1={room1} room2={room2} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-40 text-center animate-pulse">
            <div className="bg-gray-200 p-8 rounded-full mb-6">
              <FaExchangeAlt className="text-6xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">Start Comparing</h3>
            <p className="text-gray-500 text-lg max-w-md">Select a hotel and choose two different room types above to see them side-by-side.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomCompare;
