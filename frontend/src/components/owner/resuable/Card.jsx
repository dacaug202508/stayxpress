import React from 'react'
import Homeimage from '../common/Homeimage'
import Button from './Button'

function Card() {
  return (
    <div
      className="
        bg-white
        w-full
        max-w-sm
        sm:max-w-md
        lg:max-w-lg
        h-auto
        sm:h-96
        shadow-sm
        rounded-3xl
        mb-6
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <figure className="h-[55%] sm:h-[65%]">
        <Homeimage image_src="images/room.jpg" />
      </figure>

      {/* BODY */}
      <div className="h-auto sm:h-[35%] p-4 sm:p-5 flex flex-col justify-between">
        {/* TITLE */}
        <div>
          <h1 className="text-sm sm:text-base font-semibold">
            Gran Azure Resort
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Maldives
          </p>
        </div>

        <hr className="my-2 border-gray-200" />

        {/* FOOTER */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs line-through">$450</p>
            <p className="font-bold text-sm sm:text-base">
              $320
              <span className="text-gray-500 text-xs font-normal">
                {' '} / night
              </span>
            </p>
          </div>

          <Button
            css="
              bg-gray-200
              px-3
              py-1.5
              sm:px-4
              text-xs
              sm:text-sm
              font-medium
              text-black
              rounded-2xl
              hover:bg-gray-300
            "
            text="View details"
          />
        </div>
      </div>
    </div>
  )
}

export default Card
