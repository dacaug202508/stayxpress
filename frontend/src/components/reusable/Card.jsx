import React from 'react'
import Homeimage from '../common/Homeimage'
import Button from './Button'

function Card() {
  return (
    <div className="
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
    ">
      {/* IMAGE */}
      <div className="aspect-4/3 w-full">
        <Homeimage image_src="images/room.jpg" />
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* TITLE */}
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900">
            Gran Azure Resort
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Maldives
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 line-through">$450</p>
            <p className="text-sm sm:text-base font-bold text-gray-900">
              $320
              <span className="text-xs font-normal text-gray-500">
                {' '} / night
              </span>
            </p>
          </div>

          <Button
            css="
           btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn btn-soft btn-info"
            text="View details"
          />
        </div>
      </div>
    </div>
  )
}

export default Card
