import { Link } from "react-router-dom";

const NavLinks = [
  { name: "Home", to: "/user" },
  { name: "Search", to: "/user/search" },
  { name: "Compare", to: "/user/compare" },
  { name: "Booking", to: "/user/booking" },
  { name: "Profile", to: "/user/profile" },
];

function UserNavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT SECTION */}
      <div className="flex-1 flex items-center gap-4">
        {/* LOGO */}
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2">
        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />

        {/* AVATAR DROPDOWN */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-1"
          >
            <li>
              <Link className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserNavBar;
