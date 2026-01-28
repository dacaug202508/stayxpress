import React, { useState, useMemo } from "react";
import Button from "../../reusable/Button";

function ManageHotelOwner() {
  const [filter, setFilter] = useState("all");

  // Original data (simulating backend data)
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "Hart Hagerty",
      country: "United States",
      hotelName: "Sea View Resort",
      role: "Hotel Owner",
      active: true,
      image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: 2,
      name: "Jane Cooper",
      country: "Canada",
      hotelName: "Mountain Stay",
      role: "Hotel Owner",
      active: false,
      image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
  ]);

  // Editable copy (changes staged here)
  const [editedOwners, setEditedOwners] = useState(owners);

  // Detect unsaved changes
  const hasChanges = JSON.stringify(owners) !== JSON.stringify(editedOwners);

  // Toggle only in edited state
  const handleToggle = (id) => {
    setEditedOwners((prev) =>
      prev.map((owner) =>
        owner.id === id ? { ...owner, active: !owner.active } : owner
      )
    );
  };

  // Save changes → commit to main state
  const handleSaveChanges = () => {
    console.log("Saving to backend:", editedOwners);
    setOwners(editedOwners);
  };

  // Reset changes → discard edits
  const handleResetChanges = () => {
    setEditedOwners(owners);
  };

  // Filtering based on edited list (so admin sees changes live)
  const filteredOwners = useMemo(() => {
    if (filter === "active") return editedOwners.filter((o) => o.active);
    if (filter === "inactive") return editedOwners.filter((o) => !o.active);
    return editedOwners;
  }, [filter, editedOwners]);

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
              <th>Hotel</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr key={owner.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={owner.image} alt="Owner" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{owner.name}</div>
                      <div className="text-sm opacity-50">{owner.country}</div>
                    </div>
                  </div>
                </td>

                <td>
                  {owner.hotelName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {owner.role}
                  </span>
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
                    onClick={() => console.log("Viewing owner details:", owner)}
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
