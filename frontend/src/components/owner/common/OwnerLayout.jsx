import React from "react";
import { Link, Outlet } from "react-router-dom";
import OwnerNavBar from "./OwnerNavBar";
import OwnerSideBar from "./OwnerSideBar";
import { BiBell } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import Button from "../../reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { myToast } from "../../../utils/toast";
import { logout } from "../../../store/authSlice";

function OwnerLayout() {
  let dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    myToast("Logout successfull");
  }

  return (
    <>
      {/* MOBILE BLOCK */}
      <div className="md:hidden h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-xl font-semibold mb-2">Desktop Required</h1>
        <p className="text-gray-500 text-sm">
          This dashboard is optimized for tablet and desktop screens.
        </p>
      </div>

      {/* DESKTOP / TABLET */}
      <div className="hidden md:flex min-h-screen w-full bg-gray-50">
        {/* SIDEBAR */}
        <aside
          className="
            w-64
            bg-white
            h-screen
            sticky
            top-0
            shadow-sm
            flex-shrink-0
          "
        >
          <OwnerSideBar />
        </aside>

        {/* MAIN WRAPPER */}
        <div className="flex flex-col flex-1 w-full min-w-0">
          {/* HEADER */}
          <header
            className="
              h-16
              bg-white
              px-6
              flex
              items-center
              justify-between
              shadow-sm
              w-full
            "
          >
            {/* LEFT */}
            <OwnerNavBar />

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border-gray-200 p-1">
                    <RxAvatar className="w-full h-full text-gray-600" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-2xl mt-3 z-[1] p-2 shadow-xl border border-gray-100 w-52"
                >
                  <li className="menu-title px-4 py-2 text-xs text-gray-400 font-bold uppercase">
                    Account
                  </li>
                  <li>
                    <Link to="/owner/profile" className="py-2.5 px-4 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl mb-1">
                      Profile
                    </Link>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <button onClick={handleLogout} className="py-2.5 px-4 text-red-500 hover:bg-red-50 rounded-xl mt-1">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          {/* CONTENT AREA */}
          <main
            className="
              flex-1
              w-full
              
              p-6
              overflow-y-auto
              bg-gray-50
            "
          >
            {/* OUTLET FULL WIDTH FIX */}
            <div className="w-full min-w-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default OwnerLayout;
