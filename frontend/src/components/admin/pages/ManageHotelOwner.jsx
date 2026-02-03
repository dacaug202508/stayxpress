import React, { useEffect, useMemo, useState } from "react";
import Button from "../../reusable/Button";
import {
  getAllUsersAdmin,
  updateUserStatus,
} from "../../../services/adminUserService";
import { FaUserShield, FaSearch, FaFilter, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

function ManageHotelOwner() {
  const [filter, setFilter] = useState("all");
  const [owners, setOwners] = useState([]);
  const [editedOwners, setEditedOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      setLoading(true);

      const res = await getAllUsersAdmin();


      const usersArray = res.data.data || res.data;
      console.log(usersArray)
      const ownerUsers = usersArray
        .filter((u) => u.role === "OWNER")
        .map((u) => ({
          id: u.id,
          name: u.fullName,
          country: "—",
          hotelName: "—",
          role: "Hotel Owner",
          active: u.status === "ACTIVE",
          email: u.email,
        }));

      setOwners(ownerUsers);
      setEditedOwners(ownerUsers);
    } catch (err) {
      console.error("Error loading owners:", err);
    } finally {
      setLoading(false);
    }
  };


  const hasChanges = JSON.stringify(owners) !== JSON.stringify(editedOwners);

  const handleToggle = (id) => {
    setEditedOwners((prev) =>
      prev.map((owner) =>
        owner.id === id ? { ...owner, active: !owner.active } : owner
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      for (const owner of editedOwners) {
        const original = owners.find((o) => o.id === owner.id);
        if (original.active !== owner.active) {
          await updateUserStatus(
            owner.id,
            owner.active ? "ACTIVE" : "DISABLED"
          );
        }
      }
      setOwners(editedOwners);
    } catch (err) {
      console.error("Error updating owner status:", err);
    }
  };

  const handleResetChanges = () => {
    setEditedOwners(owners);
  };

  const filteredOwners = useMemo(() => {
    if (filter === "active") return editedOwners.filter((o) => o.active);
    if (filter === "inactive") return editedOwners.filter((o) => !o.active);
    return editedOwners;
  }, [filter, editedOwners]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-blue-600"></span>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hotel Owners</h2>
          <p className="text-gray-500 text-sm mt-1">Manage registered hotel owners and their account status.</p>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Unsaved changes
            </span>
          )}
          <Button
            text="Discard"
            css="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            onClick={handleResetChanges}
            disabled={!hasChanges}
          />
          <Button
            text="Save Changes"
            css={`px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all ${hasChanges
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
              : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Filter Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            {["all", "active", "inactive"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`
                            px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
                            ${filter === tab
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}
                        `}
              >
                {tab}
              </button>
            ))}
          </div>
          <button onClick={fetchOwners} className="text-gray-400 hover:text-blue-600 transition-colors">
            <BiRefresh size={22} />
          </button>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-xs uppercase text-gray-400 font-bold tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Owner Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOwners.length > 0 ? (
                filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                          <FaUserShield />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{owner.name}</h4>
                          <p className="text-xs text-gray-400">{owner.email || "No email"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider">
                        {owner.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggle(owner.id)}>
                        <div className={`
                                w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300
                                ${owner.active ? "bg-green-500 justify-end" : "bg-gray-200 justify-start"}
                             `}>
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                        </div>
                        <span className={`text-xs font-bold ${owner.active ? "text-green-600" : "text-gray-400"}`}>
                          {owner.active ? "Active" : "Disabled"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Button
                        text="Details"
                        css="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={() =>
                          console.log("Viewing owner details:", owner.id)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    No owners found matching fitler.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageHotelOwner;
