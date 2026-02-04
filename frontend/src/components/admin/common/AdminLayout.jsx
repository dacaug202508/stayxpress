import React from "react";
import { Outlet, Link } from "react-router-dom";
import OwnerNavBar from "./AdminNavBar";
import OwnerSideBar from "./AdminSideBar";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
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
            {/* SPACER (Pushes content to right) */}
            <div className="flex-1"></div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-6">

              <div className="flex items-center gap-3 pl-6">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar ring-2 ring-gray-100 hover:ring-blue-100 transition-all"
                  >
                    <div className="w-10 rounded-full">
                      <RxAvatar className="w-full h-full text-gray-400 bg-gray-200" />
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-2xl mt-4 w-56 p-2 shadow-xl border border-gray-100 z-[9999]"
                  >
                    <li className="menu-title px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Account
                    </li>
                    <li>
                      <Link to="/admin/profile" className="py-3 px-4 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl flex items-center gap-3">
                        <FaUserCircle size={16} />
                        Profile
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button onClick={handleLogout} className="py-3 px-4 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-xl flex items-center gap-3 font-medium">
                        <FaSignOutAlt size={16} />
                        Logout
                      </button>
                    </li>
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
