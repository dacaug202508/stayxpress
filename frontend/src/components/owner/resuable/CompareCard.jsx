import React from "react";
import Homeimage from "../../common/Homeimage";
import Button from "./Button";
import { FaUser, FaRulerCombined, FaBed, FaCheckCircle } from "react-icons/fa";

function CompareCard({ room }) {
  if (!room) {
    return (
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-10 text-center text-gray-400">
        Select a room to compare
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* IMAGE */}
      <div className="relative h-56">
        <Homeimage image_src={room.image || "images/room.jpg"} />

        {/* Availability Badge */}
        <span
          className={`absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full ${
            room.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {room.isActive ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* BODY */}
      <div className="p-5 flex flex-col flex-1">
        {/* TITLE & PRICE */}
        <h2 className="text-lg font-semibold">
          {room.roomType} — Room {room.roomNumber}
        </h2>

        <p className="text-sky-600 text-2xl font-bold mt-1">
          ₹{room.pricePerNight}
          <span className="text-sm font-normal text-gray-500"> / night</span>
        </p>

        <hr className="my-4" />

        {/* FEATURES */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaUser className="text-sky-500" />
            <span>Up to {room.maxGuests} Guests</span>
          </div>

          {/* Optional fields if backend adds later */}
          <div className="flex items-center gap-2">
            <FaRulerCombined className="text-sky-500" />
            <span>{room.size || "Spacious Room"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBed className="text-sky-500" />
            <span>{room.bedType || "Comfortable Bed"}</span>
          </div>
        </div>

        {/* AMENITIES (if you add later) */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              AMENITIES
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Button
          css={`
            mt-6 w-full py-2.5 rounded-xl font-medium transition
            ${
              room.isActive
                ? "bg-sky-500 hover:bg-sky-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
          text={room.isActive ? "Book This Room" : "Not Available"}
          onClick={() => room.isActive && console.log("Booking:", room)}
        />
      </div>
    </div>
  );
}

export default CompareCard;
