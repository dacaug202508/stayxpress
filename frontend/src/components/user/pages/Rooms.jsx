import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomsByHotelId } from "../../../services/roomservice";
import { FaUserFriends, FaBed, FaArrowRight, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function UserRooms() {
  let { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRoomsByHotelId(hotelId);
        setRooms(res.data || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [hotelId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Available Rooms</h2>
          <p className="text-gray-500 text-lg">Choose the perfect room for your stay</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="p-4 bg-gray-50 rounded-full inline-block mb-4">
              <FaBed className="text-4xl text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No rooms found for this hotel.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden"
              >
                {/* Room Image */}
                <div className="h-56 relative overflow-hidden">
                  <div className={`absolute top-4 right-4 z-10 text-xs px-3 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1.5 backdrop-blur-md ${room.isActive
                      ? "bg-green-100/90 text-green-700"
                      : "bg-red-100/90 text-red-700"
                    }`}>
                    {room.isActive ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                    {room.isActive ? "Available" : "Unavailable"}
                  </div>

                  <img
                    src={room.image || "https://static.leonardo-hotels.com/image/executive-room-with-king-bed_35ba711c8e3052877659372a86e4bb3a_2048x1365_desktop_2.jpeg"}
                    alt={room.roomType}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold shadow-sm">{room.roomType}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Room Number</div>
                      <div className="font-semibold text-gray-800 text-lg">#{room.roomNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Capacity</div>
                      <div className="flex items-center gap-2 font-medium text-gray-700 justify-end">
                        <FaUserFriends className="text-blue-500" />
                        {room.maxGuests} Guests
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100 my-4" />

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Price per night</p>
                      <p className="text-2xl font-bold text-blue-600">₹{room.pricePerNight}</p>
                    </div>

                    <button
                      disabled={!room.isActive}
                      onClick={() => navigate(`/user/rooms/${room.id}`)}
                      className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 ${room.isActive
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                    >
                      {room.isActive ? "Book Now" : "Booked"}
                      {room.isActive && <FaArrowRight size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserRooms;
