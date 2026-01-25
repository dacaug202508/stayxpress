import React from "react";
import { BiHotel, BiInfoCircle, BiHomeAlt } from "react-icons/bi";
import {
  MdRoom,
  MdPayments,
  MdOutlineBedroomParent,
  MdManageAccounts,
} from "react-icons/md";
import { PiBookOpenLight } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";
import { TbZoomCancelFilled } from "react-icons/tb";
import { FcFeedback } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { FaHotel, FaUserPlus } from "react-icons/fa";

const sideBarLinks = [
  { name: "Dashboard", to: "/admin/dashboard", icon: BiHomeAlt },
  { name: "Hotels", to: "/admin/hotels", icon: FaHotel },
  {
    name: "Hotel Owner Request",
    to: "/admin/owner-request",
    icon: FaUserPlus,
  },
  {
    name: "Manage Hotel Owners",
    to: "/admin/manage-owners",
    icon: MdManageAccounts,
  },
];

function AdminSideBar() {
  const location = useLocation();

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
            const isActive = location.pathname === to;

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
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    }
                  `}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSideBar;
