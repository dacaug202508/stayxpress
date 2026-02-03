import React from 'react'
import { BiSearch } from 'react-icons/bi'

function OwnerNavBar() {
  return (
    <div className='py-4'>
      <div className='relative group'>
        <label htmlFor="search" className='sr-only'>Search</label>

        <div className="relative flex items-center">
          <BiSearch className='absolute left-4 text-gray-400 text-xl group-focus-within:text-blue-500 transition-colors duration-200' />
          <input
            type="text"
            name="search"
            id="search"
            className='
              pl-12 pr-4 py-2.5 
              w-80 md:w-96 
              rounded-full 
              bg-gray-100/50 
              border border-transparent 
              text-gray-700 placeholder-gray-400
              focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 
              focus:outline-none 
              transition-all duration-300 ease-in-out
              shadow-sm hover:shadow-md focus:shadow-lg
            '
            placeholder='Search bookings, guests, rooms...'
          />
        </div>
      </div>
    </div>
  )
}

export default OwnerNavBar