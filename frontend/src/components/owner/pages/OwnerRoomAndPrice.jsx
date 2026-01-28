import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../../../services/roomservice";

function OwnerRoomAndPrice() {

  // ✅ STATE
  const [rooms, setRooms] = useState([
    {      

   id: 10,
   isActive: true,
   maxGuests: 2,
    pricePerNight: 3500,
    roomNumber: "102",
    roomType: "DOUBLE",
   hotel: {
      address: "Address 2",
      city: "Delhi",
      country: "India",
      createdAt: "2026-01-24T12:19:55",
      description: "Business hotel",
      hotelName: "Hotel Two",
      id: 2,
      status: "ACTIVE"

   } 

    }
  ]);

  // ✅ FETCH ROOMS (DECLARED FIRST)
  // const fetchRooms = async () => {
  //   try {
  //     const response = await getAllRooms();
  //     setRooms(response.data);
  //   } catch (error) {
  //     console.error("Error fetching rooms:", error);
  //   }
  // ]);

  // ✅ FETCH ROOMS (DECLARED FIRST)
  // const fetchRooms = async () => {
  //   try {
  //     const response = await getAllRooms();
  //     setRooms(response.data);
  //   } catch (error) {
  //     console.error("Error fetching rooms:", error);
  //   }
  // };

  // ✅ ON PAGE LOAD
  useEffect(() => {

    (
      async () => {
         try {
      const response = await getAllRooms();
      console.log(response.data)
      console.log(response.data[0].isActive)
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
      }
    )()



  }, []);

  // ✅ DELETE ROOM
  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this room?")) {
  //     try {
  //       await deleteRoom(id);
  //       fetchRooms(); // refresh list
  //     } catch (error) {
  //       console.error("Error deleting room:", error);
  //     }
  //   }
  // };



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
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <tr key={room.id} className="hover">
                      <th>{index + 1}</th>
                      <td>{room.hotel.hotelName}</td>
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

                      {/* ACTION DROPDOWN */}
                      <td>
                        <div className="dropdown dropdown-bottom">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-sm"
                          >
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
                                // onClick={() => handleDelete(room.id)}
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
                      No rooms found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* PAGINATION (UI ONLY) */}
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
