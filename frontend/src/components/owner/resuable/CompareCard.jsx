import React from "react";
import Homeimage from "../../common/Homeimage";
import Button from "./Button";
import { FaUser, FaRulerCombined, FaBed, FaCheckCircle, FaRupeeSign, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CompareCard({ room, label }) {


  let navigate = useNavigate();

  // Empty State
  if (!room) {
    return (
      <div className="bg-white/50 w-full max-w-md h-full min-h-[500px] rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-10 gap-4 group hover:border-blue-300 transition-all">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform">
          <FaBed className="text-2xl" />
        </div>
        <div>
          <p className="font-bold text-gray-400 group-hover:text-blue-500 transition-colors">{label}</p>
          <p className="text-gray-400 text-sm">Select a room to compare</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group">
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <Homeimage image_src={room.image || "images/room.jpg"} css="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wide text-gray-800 border border-white/50">
          {label}
        </div>

        {/* Availability Badge */}
        <div className={`absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm text-sm font-medium ${room.isActive ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
          {room.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
          {room.isActive ? "Available" : "Sold Out"}
        </div>
      </div>

      {/* BODY */}
      <div className="p-8 flex flex-col flex-1 relative">
        {/* TITLE & PRICE */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-2">
            {room.roomType}
          </h2>
          <div className="flex items-baseline gap-1 text-blue-600">
            <FaRupeeSign className="text-lg" />
            <span className="text-3xl font-extrabold tracking-tight">{room.pricePerNight}</span>
            <span className="text-gray-400 font-medium text-sm ml-1">/ night</span>
          </div>
        </div>

        {/* KEY SPECS ROW */}
        <div className="grid grid-cols-3 gap-2 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <FaUser className="text-blue-400 text-lg mb-1" />
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Guests</span>
            <span className="font-semibold text-gray-700">{room.maxGuests}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1 border-l border-gray-200">
            <FaRulerCombined className="text-blue-400 text-lg mb-1" />
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Size</span>
            <span className="font-semibold text-gray-700">{room.size || "450 sqft"}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1 border-l border-gray-200">
            <FaBed className="text-blue-400 text-lg mb-1" />
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bed</span>
            <span className="font-semibold text-gray-700">{room.bedType || "King"}</span>
          </div>
        </div>

        {/* AMENITIES */}
        <div className="flex-1 mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Included Amenities</h3>
          {room.amenities && room.amenities.length > 0 ? (
            <div className="space-y-3">
              {room.amenities.slice(0, 5).map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500 group-hover/item:bg-green-100 transition-colors">
                    <FaCheckCircle className="text-xs" />
                  </div>
                  <span className="text-gray-600 font-medium">{amenity}</span>
                </div>
              ))}
              {room.amenities.length > 5 && (
                <p className="text-xs text-gray-400 italic pl-9">+ {room.amenities.length - 5} more amenities</p>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">No amenities listed</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Button
            css={`
                w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1
                ${room.isActive
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }
              `}
            text={room.isActive ? "Book This Room" : "Sold Out"}
            onClick={() => room.isActive && navigate(`/user/rooms/${room.id}`)}
          />
        </div>

      </div>
    </div>
  );
}

export default CompareCard;
