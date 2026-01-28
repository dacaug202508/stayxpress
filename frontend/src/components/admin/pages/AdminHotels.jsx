import React, { useState, useMemo } from "react";
import Button from "../../reusable/Button";

function AdminHotels() {
  const [filter, setFilter] = useState("all");

  // Original backend data
  const [hotels, setHotels] = useState([
    {
      id: 1,
      owner: "Hart Hagerty",
      country: "United States",
      hotelName: "Sea View Resort",
      role: "Luxury Hotel",
      location: "Pune",
      status: "active",
      image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: 2,
      owner: "Jane Cooper",
      country: "Canada",
      hotelName: "Mountain Stay",
      role: "Budget Hotel",
      location: "Mumbai",
      status: "inactive",
      image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
  ]);

  // Editable copy
  const [editedHotels, setEditedHotels] = useState(hotels);

  const hasChanges =
    JSON.stringify(hotels) !== JSON.stringify(editedHotels);

  // Change status only in edited state
  const handleStatusChange = (id, newStatus) => {
    setEditedHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === id ? { ...hotel, status: newStatus } : hotel
      )
    );
  };

  // Save changes
  const handleSaveChanges = () => {
    console.log("Saving updated hotels:", editedHotels);
    setHotels(editedHotels);
  };

  // Reset changes
  const handleResetChanges = () => {
    setEditedHotels(hotels);
  };

  // Filtered hotels
  const filteredHotels = useMemo(() => {
    if (filter === "active")
      return editedHotels.filter((h) => h.status === "active");
    if (filter === "inactive")
      return editedHotels.filter((h) => h.status === "inactive");
    return editedHotels;
  }, [filter, editedHotels]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 font-semibold">
          <span>Filter Hotels:</span>
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
              <th>Owner</th>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={hotel.image} alt="Owner" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{hotel.owner}</div>
                      <div className="text-sm opacity-50">{hotel.country}</div>
                    </div>
                  </div>
                </td>

                <td>
                  {hotel.hotelName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {hotel.role}
                  </span>
                </td>

                <td>{hotel.location}</td>

                <td>
                  <select
                    value={hotel.status}
                    onChange={(e) =>
                      handleStatusChange(hotel.id, e.target.value)
                    }
                    className="select select-bordered"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

                <td>
                  <Button
                    css="btn btn-ghost btn-xs"
                    text="Details"
                    onClick={() =>
                      console.log("Viewing hotel details:", hotel)
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

export default AdminHotels;
