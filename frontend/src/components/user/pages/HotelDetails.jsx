import { useParams, useNavigate } from "react-router-dom";

function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  console.log("Fetching hotel details for ID:", hotelId);

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oceanview Paradise Resort
        </h1>

        <p className="text-gray-600 mb-4">
          Luxury beachside resort with private villas and infinity pool.
        </p>

        <button
          onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
          className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          View Rooms
        </button>
      </div>
    </div>
  );
}

export default HotelDetails;
