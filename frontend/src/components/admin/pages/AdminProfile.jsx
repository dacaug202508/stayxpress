import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { FaUser, FaCamera, FaUserShield, FaCheckCircle, FaChartLine, FaIdBadge, FaClock, FaCalendarAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { getUserProfile } from "../../../services/userService";

function AdminProfile() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            if (userId) {
                const res = await getUserProfile(userId);
                setAdmin(res.data);
            }
        } catch (err) {
            console.error("Error fetching admin profile", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 text-gray-500">
                Failed to load profile.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6 md:p-12">
            <div className="w-full max-w-xl bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">

                {/* Profile Header Background */}
                <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                </div>

                <div className="px-10 pb-10">
                    {/* Avatar Section */}
                    <div className="relative -mt-16 mb-8 flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                                {admin.profileImage ? (
                                    <img src={admin.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <RxAvatar className="w-full h-full text-gray-400 bg-gray-200" />
                                )}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mt-4">{admin.fullName || admin.username}</h2>
                        <p className="text-gray-500 text-sm">{admin.email}</p>
                        <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                            <FaUserShield /> {admin.role}
                        </span>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">Account Details</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">ID</label>
                                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono text-sm">
                                        <FaIdBadge className="text-gray-400" /> {admin.id}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Username</label>
                                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 font-medium">
                                        <FaUser className="text-gray-400" /> {admin.username || localStorage.getItem("username") || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</label>
                                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 font-medium">
                                        <span className="text-gray-400">@</span> {admin.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
