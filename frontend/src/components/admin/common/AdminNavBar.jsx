import React from 'react'
import { BiSearch } from 'react-icons/bi'

function AdminNavBar() {
  return (

    <div className='py-6 '>
      <div>
        {/* <label htmlFor="search" className=''></label> */}
        <div className='relative'>
          <input
            type="text"
            name="search"
            id="search"
            className='pl-7 w-72 h-8 rounded-4xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
            placeholder='search booking, guests, rooms...'
          />
          <BiSearch className='absolute top-2 left-2 text-gray-500' />
        </div>

      </div>
    </div>
  )
}

export default AdminNavBar