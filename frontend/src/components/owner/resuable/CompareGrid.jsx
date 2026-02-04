import React from "react";
import CompareCard from "./CompareCard";

function CompareGrid({ room1, room2 }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* ROOM 1 */}
        <div className="flex justify-center md:justify-end">
          <CompareCard room={room1} label="Option A" />
        </div>

        {/* VS BADGE (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border-4 border-gray-50 text-xl font-black text-blue-600 italic transform rotate-12">
          VS
        </div>

        {/* ROOM 2 */}
        <div className="flex justify-center md:justify-start">
          <CompareCard room={room2} label="Option B" />
        </div>
      </div>
    </div>
  );
}

export default CompareGrid;
