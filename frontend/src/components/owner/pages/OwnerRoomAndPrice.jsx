import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getHotelsByOwnerId } from "../../../services/hotelservice";
import { getRoomsByHotelId, deleteRoom } from "../../../services/roomservice";
import { useSelector } from "react-redux";
import {
  FaBed,
  FaSortAmountDown,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch
} from "react-icons/fa";
import { toast } from "react-toastify";

function OwnerRoomAndPrice() {
  let state = useSelector((state) => state.auth);
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerId(state.userId);
      setHotels(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching hotels", error);
      toast.error("Failed to load hotels");
      setHotels([]);
    }
  };

  const fetchRoomsByHotel = async (hotelId) => {
    try {
      setLoading(true);
      const res = await getRoomsByHotelId(hotelId);
      setRooms(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching rooms", error);
      toast.error("Failed to load rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelChange = (e) => {
    const hotelId = e.target.value;
    setSelectedHotelId(hotelId);
    hotelId ? fetchRoomsByHotel(hotelId) : setRooms([]);
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await deleteRoom(roomId);
      toast.success("Room deleted successfully");
      if (selectedHotelId) fetchRoomsByHotel(selectedHotelId);
    } catch (error) {
      console.error("Error deleting room", error);
      toast.error("Failed to delete room");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            Rooms & Pricing
          </h1>
          <p className="text-gray-500 mt-1">Manage room inventory and pricing</p>
        </div>

        <Link
          to="/owner/add-room"
          className="btn bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-500/30 gap-2 normal-case text-sm"
        >
          <FaPlus /> Add New Room
        </Link>
      </div>

      {/* FILTERS CARD */}
      <div className="card bg-white shadow-sm border border-gray-100 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <label className="text-gray-500 font-medium whitespace-nowrap">Filter by Hotel:</label>
        <select
          className="select select-bordered w-full md:w-80 bg-gray-50 focus:bg-white transition-all"
          value={selectedHotelId}
          onChange={handleHotelChange}
        >
          <option value="">Select a Hotel...</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.hotelName}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE CARD */}
      <div className="card bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <h2 className="font-bold text-gray-700 flex items-center gap-2">
            <FaBed className="text-blue-500" />
            Room Inventory
          </h2>
          <span className="badge badge-ghost font-medium">{rooms.length} Rooms</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 pl-6 text-left rounded-none">#</th>
                <th className="py-4">Hotel</th>
                <th className="py-4">Room No</th>
                <th className="py-4">Type</th>
                <th className="py-4 text-right">Price / Night</th>
                <th className="py-4 text-center">Status</th>
                <th className="py-4 pr-6 text-center rounded-none">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-20 text-gray-400">
                    <div className="loading loading-spinner text-blue-500 mb-2"></div>
                    <p>Loading rooms...</p>
                  </td>
                </tr>
              ) : rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <tr key={room.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-50 last:border-none group">
                    <th className="pl-6 text-gray-400 font-normal">{index + 1}</th>
                    <td className="font-semibold text-gray-700">{room.hotel?.hotelName || "-"}</td>
                    <td className="font-medium">
                      <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200">
                        {room.roomNumber}
                      </span>
                    </td>
                    <td className="text-gray-500">{room.roomType}</td>
                    <td className="text-right font-bold text-gray-800">
                      ₹{room.pricePerNight}
                      <span className="text-xs font-normal text-gray-400">/night</span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${room.isActive
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-yellow-50 text-yellow-600 border-yellow-200"
                          }`}
                      >
                        {room.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="pr-6 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/owner/edit-room/${room.id}`}
                          className="btn btn-sm btn-square btn-ghost text-blue-500 hover:bg-blue-50"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="btn btn-sm btn-square btn-ghost text-red-500 hover:bg-red-50"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-24">
                    <div className="flex flex-col items-center justify-center text-gray-300">
                      <FaSearch className="text-5xl mb-4" />
                      <p className="text-lg font-medium text-gray-500">No rooms found</p>
                      <p className="text-sm">Select a hotel to view its rooms inventory</p>
                    </div>
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

export default OwnerRoomAndPrice;
