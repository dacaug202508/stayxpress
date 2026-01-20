import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const NavLinks = [
  { name: "Home", to: "/" },
  { name: "Search", to: "/search" },
  { name: "Booking", to: "/booking" },
  { name: "Profile", to: "/profile" },
];

function CommonNavbar() {
  let state = useSelector((state) => state.auth);
  let [isauthenticated, setIsAuthenticated] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(state.status);
    setIsAuthenticated(state.status);
  }, [state]);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE DROPDOWN */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {NavLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.to} className="hover:text-sky-400 transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>

      {/* RIGHT – MOBILE */}
      <div className="navbar-end lg:hidden">
        {isauthenticated ? (
          <Button
            onClick={handleLogout}
            text="Logout"
            css="btn btn-outline btn-info"
          />
        ) : (
          <Link to={"/login"}>
            <Button text="Login" css="btn btn-outline btn-info" />
          </Link>
        )}
      </div>

      {/* RIGHT – DESKTOP */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
        <ul className="menu menu-horizontal px-1">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.to} className="hover:text-sky-400 transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {isauthenticated ? (
          <Button
            onClick={handleLogout}
            text="Logout"
            css="btn btn-outline btn-info"
          />
        ) : (
          <Link to={"/login"}>
            <Button text="Login" css="btn btn-outline btn-info" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default CommonNavbar;
