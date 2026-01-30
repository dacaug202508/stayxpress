import React, { useEffect, useMemo, useState } from "react";
import Button from "../../reusable/Button";
import {
  getAllHotelsAdmin,
  getHotelsByOwnerAdmin,
  updateHotelStatus,
} from "../../../services/adminHotelService";

function AdminHotels() {
  const [filter, setFilter] = useState("all");
  const [hotels, setHotels] = useState([]);
  const [editedHotels, setEditedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const ownerId = localStorage.getItem("selectedOwnerId");
  // If admin is viewing a specific owner's hotels. If null → show all

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      let response;
      if (ownerId) {
        response = await getHotelsByOwnerAdmin(ownerId);
      } else {
        response = await getAllHotelsAdmin();
      }

      // Backend returns: id, name, city, country, status
      const formatted = response.data.map((h) => ({
        id: h.id,
        hotelName: h.name,
        location: `${h.city}, ${h.country}`,
        status: h.status.toLowerCase(), // ACTIVE → active
      }));

      setHotels(formatted);
      setEditedHotels(formatted);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = JSON.stringify(hotels) !== JSON.stringify(editedHotels);

  const handleStatusChange = (id, newStatus) => {
    setEditedHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === id ? { ...hotel, status: newStatus } : hotel
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      for (const hotel of editedHotels) {
        const original = hotels.find((h) => h.id === hotel.id);
        if (original.status !== hotel.status) {
          await updateHotelStatus(
            hotel.id,
            hotel.status.toUpperCase() // active → ACTIVE
          );
        }
      }
      setHotels(editedHotels);
    } catch (err) {
      console.error("Error saving hotel updates:", err);
    }
  };

  const handleResetChanges = () => {
    setEditedHotels(hotels);
  };

  const filteredHotels = useMemo(() => {
    if (filter === "active")
      return editedHotels.filter((h) => h.status === "active");
    if (filter === "inactive")
      return editedHotels.filter((h) => h.status === "inactive");
    return editedHotels;
  }, [filter, editedHotels]);

  if (loading) {
    return <div className="p-6">Loading hotels...</div>;
  }

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
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td className="font-medium">{hotel.hotelName}</td>
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
                      console.log("Viewing hotel details:", hotel.id)
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
