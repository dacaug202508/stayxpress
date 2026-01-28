import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomsByHotelId } from "../../../services/roomservice";

function RoomsPage() {
  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRoomsByHotelId(hotelId);
        console.log("Rooms:", res.data);
        setRooms(res.data || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    })();
  }, [hotelId]);

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-sky-800">Rooms Available</h2>

      {rooms.length === 0 ? (
        <p className="text-gray-500">No rooms found for this hotel.</p>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col overflow-hidden"
            >
              {/* Room Image Placeholder */}
              <div className="h-44 bg-slate-200 relative">
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
                    room.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {room.isActive ? "Available" : "Unavailable"}
                </span>
                <img src={room.image} alt="" className="h-full w-full" />
              </div>

              {/* Room Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Room {room.roomNumber} — {room.roomType}
                </h3>

                <p className="text-sm text-gray-600">
                  👥 Up to{" "}
                  <span className="font-semibold">{room.maxGuests}</span> guests
                </p>

                <p className="text-sky-600 font-bold text-lg mt-2">
                  ₹{room.pricePerNight}{" "}
                  <span className="text-sm text-gray-500">/ night</span>
                </p>

                <div className="mt-auto pt-4">
                  <button
                    disabled={!room.isActive}
                    onClick={() => console.log("Booking room:", room)}
                    className={`w-full py-2 rounded-lg font-semibold transition ${
                      room.isActive
                        ? "bg-sky-600 text-white hover:bg-sky-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {room.isActive ? "Book Now" : "Not Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomsPage;
