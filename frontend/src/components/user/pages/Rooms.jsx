import { useParams } from "react-router-dom";

function RoomsPage() {
  const { hotelId } = useParams();

  console.log("Fetching rooms for hotel:", hotelId);

  const rooms = [
    { id: 1, type: "Deluxe Room", price: 220, guests: 2 },
    { id: 2, type: "Suite", price: 350, guests: 4 },
  ];

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{room.type}</h3>
            <p className="text-gray-600">👥 Up to {room.guests} guests</p>
            <p className="text-sky-600 font-bold mt-2">${room.price}/night</p>

            <button
              onClick={() => console.log("Check availability for room", room.id)}
              className="mt-4 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200"
            >
              Check Availability
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;
