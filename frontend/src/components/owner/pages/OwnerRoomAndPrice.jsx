import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

function OwnerRoomAndPrice() {

  // ✅ DUMMY DATA
  const rooms = [
    {
      id: 1,
      hotel: "Hotel Sunrise",
      roomId: "R-101",
      roomType: "Deluxe Room",
      price: 4500,
      status: "Available",
    },
    {
      id: 2,
      hotel: "Hotel Sunrise",
      roomId: "R-102",
      roomType: "Standard Room",
      price: 2500,
      status: "Booked",
    },
    {
      id: 3,
      hotel: "Hotel Ocean View",
      roomId: "R-201",
      roomType: "Suite",
      price: 6000,
      status: "Available",
    },
  ];

  // ✅ DELETE HANDLER
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      console.log("Deleted room id:", id);

      // API later
      // axios.delete(`/api/rooms/${id}`);
    }
  };

  return (
    <div className="w-full space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Rooms & Pricing
        </h1>

        <Link to="/owner/add-room" className="btn btn-info btn-soft">
          + Add New Room
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">

          <div className="overflow-x-auto">
            <table className="table">

              {/* TABLE HEAD */}
              <thead className="bg-gray-50">
                <tr>
                  <th>#</th>
                  <th>Hotel</th>
                  <th>Room ID</th>
                  <th>Room Type</th>
                  <th>Price / Night</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {rooms.map((room, index) => (
                  <tr key={room.id} className="hover">
                    <th>{index + 1}</th>
                    <td>{room.hotel}</td>
                    <td>{room.roomId}</td>
                    <td>{room.roomType}</td>
                    <td>₹{room.price}</td>
                    <td>
                      <span
                        className={`badge badge-outline ${
                          room.status === "Available"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>

                    {/* ACTION COLUMN (BOTTOM DROPDOWN) */}
                    <td className="relative">
                      <div className="dropdown dropdown-bottom">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-sm"
                        >
                          <BsThreeDotsVertical />
                        </div>

                        <ul
                          tabIndex={-1}
                          className="dropdown-content menu bg-base-100 rounded-box z-50 w-40 p-2 shadow-md"
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
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center">
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 1</button>
          <button className="join-item btn">»</button>
        </div>
      </div>

    </div>
  );
}

export default OwnerRoomAndPrice;
