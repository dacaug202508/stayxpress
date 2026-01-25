import React from 'react'
import {
  BiHotel,
  BiInfoCircle,
  BiHomeAlt,
} from 'react-icons/bi'
import { MdRoom, MdPayments, MdOutlineBedroomParent } from 'react-icons/md'
import { PiBookOpenLight } from 'react-icons/pi'
import { GiConfirmed } from 'react-icons/gi'
import { TbZoomCancelFilled } from 'react-icons/tb'
import { FcFeedback } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { FaHotel } from "react-icons/fa";

const sideBarLinks = [
  // { name: 'Dashboard', to: '/owner/dashboard', icon: BiHomeAlt },
  { name: 'Hotel Info', to: '/owner/upload-info', icon: BiInfoCircle },
  { name: 'Rooms & Pricing', to: '/owner/rooms-pricing', icon: MdRoom },
  { name: 'Bookings', to: '/owner/view-bookings', icon: PiBookOpenLight },
  { name: 'Confirm Bookings', to: '/owner/confirm-booking', icon: GiConfirmed },
  { name: 'Payments', to: '/owner/payments', icon: MdPayments },
  { name: 'Feedbacks', to: '/owner/view-feedbacks', icon: FcFeedback },
  { name: 'Cancelled', to: '/owner/cancel-bookings', icon: TbZoomCancelFilled },
  { name: 'Add Hotel', to: '/owner/add-hotel', icon: FaHotel },
  { name: 'Add Room', to: '/owner/add-room', icon: MdOutlineBedroomParent },
]

function OwnerSideBar() {
  const location = useLocation()

  return (
    <aside className="h-full bg-white border-r text-gray-300">

      {/* LOGO / TITLE */}
      <div className="flex items-center gap-3 px-6 py-5">
        <BiHotel className="text-2xl text-blue-500" />
        <h1 className="text-lg text-black font-bold tracking-wide">
          HotelManager
        </h1>
      </div>

      {/* NAV LINKS */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sideBarLinks.map(({ name, to, icon: Icon }) => {
            const isActive = location.pathname === to

            return (
              <li key={name}>
                <Link
                  to={to}
                  className={`
                    grid grid-cols-[20px_1fr]
                    items-center gap-3
                    px-4 py-3 rounded-xl text-sm
                    transition
                    ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                    }
                  `}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

    </aside>
  )
}

export default OwnerSideBar
