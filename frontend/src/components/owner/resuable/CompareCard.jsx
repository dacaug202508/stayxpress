import React from "react";
import Homeimage from "../../common/Homeimage";
import Button from "./Button";
import { FaUser, FaRulerCombined, FaBed, FaCheckCircle } from "react-icons/fa";

function CompareCard() {
  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-md overflow-hidden">
      {/* IMAGE */}
      <div className="relative h-56">
        <Homeimage image_src="images/room.jpg" />
        {/* BADGE */}
        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          Best Value
        </span>
      </div>

      {/* BODY */}
      <div className="p-5">
        {/* TITLE & PRICE */}
        <h2 className="text-lg font-semibold">Deluxe King Suite</h2>
        <p className="text-blue-600 text-2xl font-bold mt-1">
          $250 <span className="text-sm font-normal text-gray-500">/ night</span>
        </p>

        <hr className="my-4" />

        {/* FEATURES */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-500" />
            <span>Up to 3 Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRulerCombined className="text-blue-500" />
            <span>45 m²</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBed className="text-blue-500" />
            <span>1 King Bed</span>
          </div>
        </div>

        {/* AMENITIES */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            AMENITIES
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Free Wi-Fi
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Sea View
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Breakfast Included
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Bathtub
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          css="
            mt-6
            w-full
            bg-sky-500
            hover:bg-sky-600
            text-white
            py-2.5
            rounded-xl
            font-medium
          "
          text="Book This Room"
        />
      </div>
    </div>
  );
}

export default CompareCard;
