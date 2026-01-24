import React from "react";
import { Outlet } from "react-router-dom";
import UserNavBar from "./UserNavBar";

function UserLayout() {
  return (
    <>
      <UserNavBar />

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;
