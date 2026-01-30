import React, { useEffect, useMemo, useState } from "react";
import Button from "../../reusable/Button";
import {
  getAllUsersAdmin,
  updateUserStatus,
} from "../../../services/adminUserService";

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
      const res = await getAllUsersAdmin();

      // Only OWNER role users
      const ownerUsers = res.data
        .filter((u) => u.role === "OWNER")
        .map((u) => ({
          id: u.id,
          name: u.fullName,
          country: "—", // not stored in DB
          hotelName: "—", // requires join later if needed
          role: "Hotel Owner",
          active: u.status === "ACTIVE",
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

  if (loading) return <div className="p-6">Loading owners...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 font-semibold">
          <span>Filter Owners:</span>
          <div className="tabs tabs-box bg-base-200">
            <button
              className={`tab ${filter === "all" && "tab-active"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`tab ${filter === "active" && "tab-active"}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`tab ${filter === "inactive" && "tab-active"}`}
              onClick={() => setFilter("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          {hasChanges && (
            <span className="text-sm text-orange-500 font-medium self-center">
              Unsaved changes
            </span>
          )}
          <Button
            text="Reset"
            css="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={handleResetChanges}
          />
          <Button
            text="Save Changes"
            css="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90"
            onClick={handleSaveChanges}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr key={owner.id}>
                <td>
                  <div className="font-bold">{owner.name}</div>
                  <div className="text-sm opacity-50">{owner.role}</div>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={owner.active}
                      onChange={() => handleToggle(owner.id)}
                      className="toggle toggle-info"
                    />
                    <span
                      className={`text-sm font-medium ${
                        owner.active ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {owner.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>

                <td>
                  <Button
                    css="btn btn-ghost btn-xs"
                    text="Details"
                    onClick={() =>
                      console.log("Viewing owner details:", owner.id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageHotelOwner;
