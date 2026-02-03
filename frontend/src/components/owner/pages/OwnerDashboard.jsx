import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHotel,
  FaPlus,
  FaBed,
  FaChartLine,
  FaCalendarCheck,
  FaWallet
} from 'react-icons/fa';

function OwnerDashboard() {
  const navigate = useNavigate();
  const ownerName = localStorage.getItem("name") || "Partner";

  const stats = [
    { title: "Total Bookings", value: "128", icon: <FaCalendarCheck />, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Revenue", value: "₹4.2L", icon: <FaWallet />, color: "text-green-600", bg: "bg-green-100" },
    { title: "Occupancy Rate", value: "85%", icon: <FaChartLine />, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Active Rooms", value: "42", icon: <FaBed />, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">

      {/* WELCOME SECTION */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">{ownerName}</span> 👋
        </h1>
        <p className="text-gray-500 mt-2">Here is what's happening with your properties today.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="card-body flex flex-row items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ADD HOTEL */}
        <div
          onClick={() => navigate('/owner/add-hotel')}
          className="group cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaHotel size={100} />
          </div>
          <div className="relative z-10">
            <div className="p-3 bg-white/20 w-fit rounded-xl backdrop-blur-sm mb-4">
              <FaPlus className="text-xl" />
            </div>
            <h3 className="text-xl font-bold">List New Property</h3>
            <p className="text-blue-100 mt-1 text-sm">Add a new hotel to your portfolio</p>
          </div>
        </div>

        {/* ADD ROOM */}
        <div
          onClick={() => navigate('/owner/add-room')}
          className="group cursor-pointer bg-white border border-gray-100 text-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 text-gray-50">
            <FaBed size={120} />
          </div>
          <div className="relative z-10">
            <div className="p-3 bg-orange-100 text-orange-600 w-fit rounded-xl mb-4">
              <FaPlus className="text-xl" />
            </div>
            <h3 className="text-xl font-bold">Add Room</h3>
            <p className="text-gray-500 mt-1 text-sm">Expand inventory for existing hotels</p>
          </div>
        </div>

        {/* VIEW BOOKINGS */}
        <div
          onClick={() => navigate('/owner/view-bookings')}
          className="group cursor-pointer bg-white border border-gray-100 text-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 text-gray-50">
            <FaCalendarCheck size={120} />
          </div>
          <div className="relative z-10">
            <div className="p-3 bg-green-100 text-green-600 w-fit rounded-xl mb-4">
              <FaChartLine className="text-xl" />
            </div>
            <h3 className="text-xl font-bold">View Bookings</h3>
            <p className="text-gray-500 mt-1 text-sm">Check recent reservations</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OwnerDashboard;