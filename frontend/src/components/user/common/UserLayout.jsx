import React from "react";
import { Outlet } from "react-router-dom";
import UserNavBar from "./UserNavBar";

function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavBar />

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
