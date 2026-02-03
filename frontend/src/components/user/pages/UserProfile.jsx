import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import {
  getUserProfile,
  updateUserProfile,
  requestOwnerAccess,
} from "../../../services/userService";
import { FaUser, FaEnvelope, FaIdBadge, FaCamera, FaBriefcase, FaCheckCircle, FaChevronRight } from "react-icons/fa";

function UserProfile() {
  const userId = localStorage.getItem("user_id");

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile(userId);
      setUser(res.data);
      setName(res.data.fullName || "");
      if (res.data.role === "OWNER") setRequestSent(true);
    } catch (err) {
      console.error("Error loading profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", name);
      if (image) formData.append("profileImage", image);

      await updateUserProfile(userId, formData);
      alert("Profile updated successfully!");
      fetchProfile();
    } catch (err) {
      console.error("Update failed", err);
      alert("Profile update failed");
    }
  };

  const handleOwnerRequest = async () => {
    try {
      await requestOwnerAccess(userId);
      alert("Owner request sent!");
      setRequestSent(true);
    } catch (err) {
      console.error("Request failed", err);
      alert("Failed to send owner request");
    }
  };

  if (loading || !user)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6 md:p-12">
      <div className="w-full max-w-3xl bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">

        {/* Profile Header Background */}
        <div className="h-32 bg-blue-50 relative"></div>

        <div className="px-10 pb-10">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-6 flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-4xl text-gray-200" />
                )}
              </div>
              <div className="absolute bottom-1 right-2 bg-white rounded-full p-2 shadow-md border border-gray-100 group-hover:bg-blue-50 transition-colors">
                <FaCamera className="text-gray-500 text-sm group-hover:text-blue-500" />
              </div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                title="Change Profile Photo"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.fullName || "User"}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Left Column: Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">Edit Profile</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all rounded-lg h-10 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="input input-bordered w-full bg-gray-50 text-gray-500 rounded-lg h-10 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="input input-bordered w-full bg-gray-50 text-gray-500 rounded-lg h-10 text-sm cursor-not-allowed"
                />
              </div>

              <Button
                text="Save Changes"
                css="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium transition-all"
                onClick={handleUpdate}
              />
            </div>

            {/* Right Column: Actions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">Account Actions</h3>

              {/* Owner Request Card */}
              {user.role !== "OWNER" && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <FaBriefcase />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Become a Partner</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        List your property and start earning.
                      </p>
                    </div>
                  </div>
                  <Button
                    text={requestSent ? "Request Pending" : "Request Access"}
                    css={`w-full text-xs font-bold py-2 rounded-lg border ${requestSent
                        ? "bg-green-50 text-green-700 border-green-200 cursor-default"
                        : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                      }`}
                    onClick={handleOwnerRequest}
                    disabled={requestSent}
                    icon={requestSent ? <FaCheckCircle /> : null}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
