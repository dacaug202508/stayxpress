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
<<<<<<< HEAD:frontend/stayxpress/src/components/owner/common/OwnerLayout.jsx
          w-64
          bg-white
          h-screen
          sticky
          top-0
          shadow-sm
        "
=======
            w-64
            bg-white
            h-screen
            sticky
            top-0
            shadow-sm
            flex-shrink-0
          "
>>>>>>> fb07a7c4b4caf08564ad56378755f15c44929a7f:frontend/src/components/owner/common/OwnerLayout.jsx
        >
          <OwnerSideBar />
        </aside>

        {/* MAIN WRAPPER */}
        <div className="flex flex-col flex-1 w-full min-w-0">
          
          {/* HEADER */}
          <header
            className="
<<<<<<< HEAD:frontend/stayxpress/src/components/owner/common/OwnerLayout.jsx
            h-16
            bg-white
            px-6
            flex
            items-center
            justify-between
            shadow-sm
          "
=======
              h-16
              bg-white
              px-6
              flex
              items-center
              justify-between
              shadow-sm
              w-full
            "
>>>>>>> fb07a7c4b4caf08564ad56378755f15c44929a7f:frontend/src/components/owner/common/OwnerLayout.jsx
          >
            {/* LEFT */}
            <OwnerNavBar />

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <BiBell
                size={20}
                className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
              />

              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <RxAvatar size={20} />

                <Button onClick={handleLogout} text={"logout"} css="btn" />
              </div>
            </div>
          </header>

<<<<<<< HEAD:frontend/stayxpress/src/components/owner/common/OwnerLayout.jsx
          {/* CONTENT */}
          <main
            className="
            flex-1
            p-6
            overflow-y-auto
            bg-gray-50
          "
          >
            <Outlet />
=======
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
>>>>>>> fb07a7c4b4caf08564ad56378755f15c44929a7f:frontend/src/components/owner/common/OwnerLayout.jsx
          </main>
        </div>
      </div>
    </>
  );
}

export default OwnerLayout;
