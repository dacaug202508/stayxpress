import React from "react";
import Button from "../../components/reusable/Button";

function UserProfile() {
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

        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
          <input
            type="file"
            className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-400 file:text-blue-600 hover:file:bg-sky-200"
          />
        </div>

        <hr />

        {/* Profile Form */}
        <div className="space-y-5">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              username
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              disabled
              placeholder="john@email.com"
              className="border rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Role (Display Only) */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Account Role
            </label>
            <input
              type="text"
              disabled
              value="Customer"
              className="border rounded-lg p-3 bg-gray-100 text-gray-500"
            />
          </div>

          {/* Update Button */}
          <Button
            text="Update Profile"
            css="w-full btn btn-info text-white py-3 rounded-lg font-medium"
          />
        </div>

        <hr />

        {/* Owner Request Section */}
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <p className="font-semibold text-gray-800">Become a Hotel Owner</p>
            <p className="text-sm text-gray-600">
              Request access to list and manage your own hotels.
            </p>
          </div>

          <Button
            text="Request Owner Access"
            css="btn btn-info text-white px-5 py-2 rounded-lg whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
