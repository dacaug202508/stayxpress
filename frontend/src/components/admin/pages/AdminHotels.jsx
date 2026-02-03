import React, { useEffect, useMemo, useState } from "react";
import Button from "../../reusable/Button";
import {
  getAllHotelsAdmin,
  getHotelsByOwnerAdmin,
  updateHotelStatus,
} from "../../../services/adminHotelService";
import { FaHotel, FaMapMarkerAlt, FaFilter, FaCheckCircle, FaBan } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

function AdminHotels() {
  const [filter, setFilter] = useState("all");
  const [hotels, setHotels] = useState([]);
  const [editedHotels, setEditedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const ownerId = localStorage.getItem("selectedOwnerId");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registered Hotels</h2>
          <p className="text-gray-500 text-sm mt-1">Manage all hotels, monitor their status and details.</p>
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

      {/* Content Card */}
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
          <button onClick={fetchHotels} className="text-gray-400 hover:text-blue-600 transition-colors">
            <BiRefresh size={22} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-xs uppercase text-gray-400 font-bold tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Hotel Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                          <FaHotel />
                        </div>
                        <span className="font-bold text-gray-800 text-sm">{hotel.hotelName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {hotel.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={hotel.status}
                        onChange={(e) =>
                          handleStatusChange(hotel.id, e.target.value)
                        }
                        className={`
                            select select-sm w-32 text-xs font-bold border-none focus:ring-0
                            ${hotel.status === 'active'
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        css="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        text="Details"
                        onClick={() =>
                          console.log("Viewing hotel details:", hotel.id)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    No hotels found.
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

export default AdminHotels;
