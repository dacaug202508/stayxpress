import React from "react";
import { FaHotel, FaUsers, FaChartLine, FaClipboardList } from "react-icons/fa";

function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "1,240", icon: FaUsers, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Active Hotels", value: "85", icon: FaHotel, color: "text-green-600", bg: "bg-green-100" },
    { title: "Pending Requests", value: "12", icon: FaClipboardList, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Revenue", value: "$45,200", icon: FaChartLine, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-500/20">
        <h1 className="text-3xl font-bold">Welcome back, Admin</h1>
        <p className="opacity-90 mt-2 max-w-2xl">Here is what is happening with your platform today. Check the latest statistics and manage your requests.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <p>No recent activity logs available.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Components</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Service Status</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Database Connection</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
