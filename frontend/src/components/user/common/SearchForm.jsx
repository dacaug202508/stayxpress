import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaSearch } from "react-icons/fa";

function SearchForm({ search, handleChange, handleSearch }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white/90 backdrop-blur-md shadow-2xl shadow-blue-500/10 rounded-3xl p-6 lg:p-4 max-w-6xl mx-auto border border-white/50 relative z-10 -mt-24 lg:-mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 lg:gap-6 items-center">
        {/* DESTINATION */}
        <div className="relative group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-1 block group-focus-within:text-blue-500 transition-colors">Where</label>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-100 transition-all">
            <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              name="location"
              placeholder="City, Hotel, or Place"
              value={search.location}
              onChange={handleChange}
              required
              className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 font-medium placeholder-gray-400"
            />
          </div>
        </div>

        {/* CHECK-IN */}
        <div className="relative group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-1 block group-focus-within:text-blue-500 transition-colors">Check-in</label>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-100 transition-all cursor-pointer" onClick={(e) => document.getElementById('search-checkin').showPicker()}>
            <FaCalendarAlt className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              id="search-checkin"
              type="date"
              name="checkIn"
              min={today}
              value={search.checkIn}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 font-medium cursor-pointer"
            />
          </div>
        </div>

        {/* CHECK-OUT */}
        <div className="relative group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-1 block group-focus-within:text-blue-500 transition-colors">Check-out</label>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-100 transition-all cursor-pointer" onClick={(e) => document.getElementById('search-checkout').showPicker()}>
            <FaCalendarAlt className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              id="search-checkout"
              type="date"
              name="checkOut"
              min={search.checkIn || today}
              value={search.checkOut}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 font-medium cursor-pointer"
            />
          </div>
        </div>

        {/* GUESTS */}
        <div className="relative group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-1 block group-focus-within:text-blue-500 transition-colors">Guests</label>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-100 transition-all">
            <FaUser className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <select
              name="guests"
              value={search.guests}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 font-medium cursor-pointer appearance-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="mt-5 lg:mt-0">
          <button
            onClick={handleSearch}
            className="w-full lg:w-auto h-[52px] px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
