import React from "react";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
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
    <aside className="h-full bg-white border-r border-gray-100 flex flex-col">
      {/* LOGO / TITLE */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <FaHotel className="text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
            Stay<span className="text-blue-600">Xpress</span>
          </h1>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Panel</span>
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {sideBarLinks.map(({ name, to, icon: Icon }) => {
          const isActive = location.pathname === to;

          return (
            <Link
              key={name}
              to={to}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 translate-x-1"
                  : "text-gray-500 hover:bg-gray-50 hover:text-blue-600 hover:translate-x-1"
                }
                `}
            >
              <Icon className={`text-xl ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`} />
              <span>{name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-1">System Status</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-green-600">Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSideBar;
