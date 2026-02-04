import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog, FaHotel } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";


const NavLinks = [
  { name: "Home", to: "/user" },
  { name: "Find Hotels", to: "/user/search" },
  { name: "Compare Rooms", to: "/user/compare" },
  { name: "My Bookings", to: "/user/booking" },
];

function UserNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navbar bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-6 md:px-10 h-20">
      {/* LEFT SECTION */}
      <div className="flex-1 flex items-center gap-8">
        {/* LOGO */}
        {/* LOGO */}
        <Link to="/user" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <FaHotel className="text-xl" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Stay<span className="text-blue-600">Xpress</span></span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden lg:flex items-center gap-1">
          {NavLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* AVATAR DROPDOWN */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ring-2 ring-gray-100 hover:ring-blue-100 transition-all"
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
            className="menu menu-sm dropdown-content bg-white rounded-2xl mt-4 w-56 p-2 shadow-xl border border-gray-100 z-[9999]"
          >
            <li className="menu-title px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Account
            </li>
            <li>
              <Link to="/user/profile" className="py-3 px-4 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl flex items-center gap-3">
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
  );
}

export default UserNavBar;
