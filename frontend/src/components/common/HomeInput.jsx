import React from 'react'
import Button from '../reusable/Button'
import { Link } from 'react-router-dom'

function HomeInput() {
  return (
    <div className="h-full w-full">
      <form className="flex flex-col gap-6">

        {/* Destination */}
        <div className="flex flex-col gap-1">
          <label htmlFor="destination" className="font-medium text-gray-500">
            Destination
          </label>

          <div className="relative">
            <input
              id="destination"
              name="destination"
              type="text"
              placeholder="Where are you going?"
              className="w-full h-12 rounded-4xl border pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657-5.657 4 4 0 005.657 5.657l4.243 4.243z"
              />
            </svg>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="checkin" className="font-medium text-gray-500">
              Check-in
            </label>
            <input
              id="checkin"
              name="checkin"
              type="date"
              onFocus={(e) => e.target.showPicker?.()}
              className="h-12 rounded-4xl border px-3 text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="checkout" className="font-medium text-gray-500">
              Check-out
            </label>
            <input
              id="checkout"
              name="checkout"
              type="date"
              onFocus={(e) => e.target.showPicker?.()}
              className="h-12 rounded-4xl border px-3 text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
            />
          </div>

        </div>

        {/* Button */}
        <div className="pt-2 w-full">
          <Link to="/search">
            <Button css='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn btn-info w-full' text={"search"} />

            </Link>
        </div>

      </form>
    </div>
  )
}

export default HomeInput
