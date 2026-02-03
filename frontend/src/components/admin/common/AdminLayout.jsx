import React from "react";
import { Outlet } from "react-router-dom";
import OwnerNavBar from "./AdminNavBar";
import OwnerSideBar from "./AdminSideBar";
import { BiBell, BiSearch } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import Button from "../../reusable/Button";
import { useDispatch } from "react-redux";
import { myToast } from "../../../utils/toast";
import { logout } from "../../../store/authSlice";

function AdminLayout() {
  let dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    myToast("Logout successfull");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* MOBILE OVERLAY (Placeholder, functionality preserved from original if needed, but styling updated for desktop focus) */}
      <div className="md:hidden flex h-screen w-full items-center justify-center bg-gray-50 p-6 text-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Desktop View Required</h1>
          <p className="text-gray-500">Please access the Admin Panel from a larger screen.</p>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex w-full">
        {/* SIDEBAR */}
        <aside className="w-72 bg-white h-screen sticky top-0 shadow-lg shadow-gray-200/50 z-20 flex-shrink-0">
          <OwnerSideBar />
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* HEADER */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 transition-all">
            {/* Search / Breadcrumbs Area (Placeholder for Future) */}
            <div className="flex items-center gap-4 w-1/3">
              <div className="relative w-full">
                <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-6">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
                <BiBell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                    <div className="w-10 rounded-full ring ring-offset-2 ring-gray-100">
                      <RxAvatar className="w-full h-full text-gray-400 bg-gray-200" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-52 border border-gray-100">
                    <li><a className="py-2">Profile</a></li>
                    <li><a className="py-2">Settings</a></li>
                    <div className="divider my-1"></div>
                    <li><a onClick={handleLogout} className="text-red-500 font-medium py-2">Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
