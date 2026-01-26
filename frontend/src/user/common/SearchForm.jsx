import React from "react";

function SearchForm({ search, handleChange, handleSearch }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* SEARCH BAR */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          name="location"
          placeholder="Where are you going?"
          value={search.location}
          onChange={handleChange}
          className="border border-sky-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-400 md:col-span-2"
        />

        <input
          type="date"
          name="checkIn"
          min={today}
          value={search.checkIn}
          onChange={handleChange}
          onClick={(e) => e.target.showPicker?.()}
          className="border border-sky-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-400 cursor-pointer"
        />

        <input
          type="date"
          name="checkOut"
          min={search.checkIn || today}
          value={search.checkOut}
          onChange={handleChange}
          onClick={(e) => e.target.showPicker?.()}
          className="border border-sky-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-400 cursor-pointer"
        />

        <select
          name="guests"
          value={search.guests}
          onChange={handleChange}
          className="border border-sky-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-400"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg p-3 transition shadow-md active:scale-95"
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchForm;
