import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../resuable/Button";
import { getHotelsByOwnerId } from "../../../services/hotelservice";
import { getRoomsByHotelId, deleteRoom } from "../../../services/roomservice";

function OwnerRoomAndPrice() {
  const ownerId = 1; // 🔴 later from auth

  // 🔹 STATE
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Load owner hotels
  useEffect(() => {
    fetchHotels();
  }, []);

  // 🔹 Fetch Hotels (FIXED)
  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerId(ownerId);

      // ✅ hotel API returns { data: [...] }
      setHotels(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching hotels", error);
      setHotels([]);
    }
  };

  // 🔹 Load rooms by hotel (FIXED)
  const fetchRoomsByHotel = async (hotelId) => {
    try {
      setLoading(true);
      const res = await getRoomsByHotelId(hotelId);

      // ✅ room API returns []
      setRooms(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching rooms", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Dropdown change
  const handleHotelChange = (e) => {
    const hotelId = e.target.value;
    setSelectedHotelId(hotelId);

    if (hotelId) {
      fetchRoomsByHotel(hotelId);
    } else {
      setRooms([]);
    }
  };

  // 🔹 Delete room + refresh
  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      if (selectedHotelId) {
        fetchRoomsByHotel(selectedHotelId);
      }
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Rooms & Pricing
        </h1>

        <Link to="/owner/add-room" className="btn btn-info btn-soft">
          + Add New Room
        </Link>
      </div>

      {/* 🔽 HOTEL DROPDOWN */}
      <div className="w-72">
        <select
          className="select select-bordered w-full"
          value={selectedHotelId}
          onChange={handleHotelChange}
        >
          <option value="">Select Hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.hotelName}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>#</th>
                  <th>Hotel</th>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th>Price / Night</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6">
                      Loading rooms...
                    </td>
                  </tr>
                ) : rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <tr key={room.id}>
                      <th>{index + 1}</th>
                      <td>{room.hotel?.hotelName || "-"}</td>
                      <td>{room.roomNumber}</td>
                      <td>{room.roomType}</td>
                      <td>₹{room.pricePerNight}</td>
                      <td>
                        <span
                          className={`badge badge-outline ${
                            room.isActive
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {room.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div className="dropdown dropdown-bottom">
                          <div tabIndex={0} className="btn btn-ghost btn-sm">
                            <BsThreeDotsVertical />
                          </div>

                          <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-40 p-2 shadow-md">
                            <li>
                              <Link to={`/owner/edit-room/${room.id}`}>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(room.id)}
                                className="text-red-500"
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500"
                    >
                      Select a hotel to view rooms
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerRoomAndPrice;
