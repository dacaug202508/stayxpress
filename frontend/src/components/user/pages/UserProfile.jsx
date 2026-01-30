import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import {
  getUserProfile,
  updateUserProfile,
  requestOwnerAccess,
} from "../../../services/userService";

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

  // 🛑 Prevent crash while loading
  if (loading || !user)
    return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">
            Manage your personal information
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-gray-600"
          />
        </div>

        <hr />

        {/* Form */}
        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="border rounded-lg p-3 bg-gray-100 text-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Account Role
            </label>
            <input
              type="text"
              disabled
              value={user?.role || ""}
              className="border rounded-lg p-3 bg-gray-100 text-gray-500"
            />
          </div>

          <Button
            text="Update Profile"
            css="w-full btn btn-info text-white py-3 rounded-lg"
            onClick={handleUpdate}
          />
        </div>

        <hr />

        {/* Owner Request Section */}
        {user.role !== "OWNER" && (
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <p className="font-semibold text-gray-800">
                Become a Hotel Owner
              </p>
              <p className="text-sm text-gray-600">
                Request access to list and manage your own hotels.
              </p>
            </div>

            <Button
              text={requestSent ? "Request Sent" : "Request Owner Access"}
              css={`btn btn-info text-white px-5 py-2 rounded-lg ${
                requestSent ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleOwnerRequest}
              disabled={requestSent}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
