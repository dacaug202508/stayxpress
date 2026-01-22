import React from 'react'
import Homeimage from "../common/Homeimage";
import Button from "./Button";
import { IoLocationOutline } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";

function Card() {
  return (
     <div
      className="
        bg-white
        w-full
        max-w-sm
        sm:max-w-md
        lg:max-w-lg
        rounded-3xl
        shadow-sm
        overflow-hidden
        transition
        hover:shadow-md
      "
    >
      {/* IMAGE */}
      <div className="aspect-4/3 w-full">
        <Homeimage image_src="images/room.jpg" />
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* TITLE + LOCATION */}
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
            Gran Azure Resort
            <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 font-normal">
              <IoLocationOutline className="text-sm" />
              Maldives
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-600 line-clamp-3 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
            aut rem veniam dicta amet eligendi voluptates laboriosam cum.
          </p>
        </div>

        {/* PRICE */}
        <div>
          <p className="text-sm sm:text-base font-bold text-gray-900">
            $320
            <span className="text-xs font-normal text-gray-500">
              {" "} / night
            </span>
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* FOOTER BUTTONS — PROPERLY ASSIGNED */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            css="
              w-full
              btn btn-xs sm:btn-sm md:btn-md
              btn-soft btn-info
              flex items-center justify-center gap-1
            "
            text={
              <>
                <MdCompareArrows className="text-base" />
                Compare
              </>
            }
          />

          <Button
            css="
              w-full
              btn btn-xs sm:btn-sm md:btn-md
              btn-soft btn-info
            "
            text="View details"
          />
        </div>
      </div>
    </div>
  )
}

export default Card
