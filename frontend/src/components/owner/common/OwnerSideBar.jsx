import React from 'react'
import {
  BiInfoCircle,
} from 'react-icons/bi'
import { MdRoom, MdOutlineBedroomParent } from 'react-icons/md'
import { PiBookOpenLight } from 'react-icons/pi'
import { TbZoomCancelFilled } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import { FaHotel, FaConciergeBell } from "react-icons/fa";

const sideBarLinks = [
  // { name: 'Dashboard', to: '/owner/dashboard', icon: BiHomeAlt },
  { name: 'Hotel Info', to: '/owner/upload-info', icon: BiInfoCircle },
  { name: 'Rooms & Pricing', to: '/owner/rooms-pricing', icon: MdRoom },
  { name: 'Bookings', to: '/owner/view-bookings', icon: PiBookOpenLight },
  // { name: 'Confirm Bookings', to: '/owner/confirm-booking', icon: GiConfirmed },
  // { name: 'Payments', to: '/owner/payments', icon: MdPayments },
  // { name: 'Feedbacks', to: '/owner/view-feedbacks', icon: FcFeedback },
  { name: 'Cancelled', to: '/owner/cancelled', icon: TbZoomCancelFilled },
  { name: 'Add Hotel', to: '/owner/add-hotel', icon: FaHotel },
  { name: 'Add Room', to: '/owner/add-room', icon: MdOutlineBedroomParent },
]

function OwnerSideBar() {
  const location = useLocation()

  return (
    <aside className="h-full bg-white flex flex-col border-r border-gray-100 relative z-20">

      {/* HEADER / LOGO */}
      <div className="flex items-center gap-3 px-8 py-8 mb-2">
        <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-200">
          <FaConciergeBell className="text-xl" />
        </div>
        <div>
          <h1 className="text-lg text-gray-800 font-bold tracking-wide font-sans">
            StayXpress
          </h1>
          <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">
            Owner Panel
          </p>
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar space-y-1">
        {sideBarLinks.map(({ name, to, icon: Icon }) => {
          const isActive = location.pathname === to

          return (
            <div key={name}>
              <Link
                to={to}
                className={`
                    group flex items-center gap-3.5
                    px-4 py-3.5 rounded-xl text-sm font-medium
                    transition-all duration-200 ease-in-out
                    ${isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }
                  `}
              >
                <Icon
                  className={`text-xl transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                />
                <span>{name}</span>

                {/* Subtle Active Indicator */}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </Link>
            </div>
          )
        })}
      </nav>

      {/* FOOTER AREA */}
      <div className="p-4 mt-auto">
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Need assistance?</p>
          <p className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">Contact Support</p>
        </div>
      </div>

    </aside>
  )
}

export default OwnerSideBar
