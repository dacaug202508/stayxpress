import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getHotelsByOwnerId } from "../../../services/hotelservice";
import { getRoomsByHotelId, deleteRoom } from "../../../services/roomservice";
import { useSelector } from "react-redux";

function OwnerRoomAndPrice() {
  let state = useSelector((state) => state.auth);
  console.log(state);
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
    try {
      await deleteRoom(roomId);
      if (selectedHotelId) fetchRoomsByHotel(selectedHotelId);
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

      {/* HOTEL DROPDOWN */}
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

      {/* TABLE CARD */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="flex items-center justify-between px-6 pt-4">
            <h2 className="font-semibold text-gray-700">
              {rooms.length} Room(s) Found
            </h2>
          </div>

          <div className="overflow-x-auto h-screen ">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="w-12 text-center">#</th>
                  <th>Hotel</th>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th className="text-right">Price / Night</th>
                  <th>Status</th>
                  <th className="w-24 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6">
                      Loading rooms...
                    </td>
                  </tr>
                ) : rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <tr key={room.id} className="hover">
                      <th className="text-center">{index + 1}</th>

                      <td className="font-medium">
                        {room.hotel?.hotelName || "-"}
                      </td>

                      <td>{room.roomNumber}</td>

                      <td>{room.roomType}</td>

                      <td className="text-right font-semibold">
                        ₹{room.pricePerNight}
                      </td>

                      <td>
                        <span
                          className={`badge badge-sm ${
                            room.isActive ? "badge-success" : "badge-warning"
                          }`}
                        >
                          {room.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="text-center">
                        <div className="dropdown dropdown-end dropdown-hover">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm btn-circle"
                          >
                            <BsThreeDotsVertical size={18} />
                          </label>

                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-40 z-[9999]"
                          >
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
                    <td colSpan="7" className="text-center py-6 text-gray-500">
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
