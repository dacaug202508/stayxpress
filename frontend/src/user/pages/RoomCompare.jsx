import React from "react";
import CompareGrid from "../../components/owner/resuable/CompareGrid";


function RoomCompare() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Compare Rooms
        </h1>
        <p className="text-gray-600 mt-2">
          Select two rooms to compare features, prices, and amenities side-by-side.
        </p>
      </div>

      {/* ROOM SELECT SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Room 1
            </label>
            <select className="select select-bordered w-full">
              <option>Deluxe King Suite</option>
              <option>Standard Double</option>
              <option>Executive Room</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Room 2
            </label>
            <select className="select select-bordered w-full">
              <option>Standard Double</option>
              <option>Deluxe King Suite</option>
              <option>Executive Room</option>
            </select>
          </div>
        </div>
      </div>

      {/* COMPARE CARDS */}
      <CompareGrid />
    </div>
  );
}

export default RoomCompare;
