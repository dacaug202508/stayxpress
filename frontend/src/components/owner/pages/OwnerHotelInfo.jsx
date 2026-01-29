import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import {
  getHotelsByOwnerId,
  deleteHotel,
} from "../../../services/hotelservice";
import { useSelector } from "react-redux";

function OwnerHotelInfo() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([{}]);
  const [loading, setLoading] = useState(true);

  let state = useSelector((state) => state.auth);

  

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerId(state.userId);
      console.log(res.data);
      setHotels(res.data.data);
    } catch (error) {
      console.error("Error fetching hotels", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (hotel) => {
    try {
      await deleteHotel(hotel.id);
      setHotels((prev) => prev.filter((h) => h.id !== hotel.id));
    } catch (error) {
      console.error("Error deleting hotel", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading hotels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-sky-900 mb-10">My Hotels</h2>

        <div className="space-y-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row"
            >
              {/* IMAGE */}
              <div className="md:w-72 w-full h-56 md:h-auto relative">
                <img
                  src={
                    hotel.imageUrl ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  }
                  alt={hotel.hotelName}
                  className="w-full h-full object-cover"
                />

                {/* STATUS BADGE OVER IMAGE */}
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow ${
                    hotel.status === "ACTIVE"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {hotel.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {hotel.hotelName}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    📍 {hotel.city}, {hotel.country}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <p>{hotel.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Country</p>
                      <p>{hotel.country}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    {hotel.description}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    text="Edit Hotel"
                    onClick={() => navigate(`/owner/update-hotel/${hotel.id}`)}
                    css="px-5 py-2.5 bg-yellow-100 text-yellow-700 rounded-xl text-sm font-medium hover:bg-yellow-200 transition"
                  />

                  <Button
                    text="Delete"
                    onClick={() => handleDelete(hotel)}
                    css="px-5 py-2.5 bg-red-100 text-red-600 rounded-xl text-sm font-medium hover:bg-red-200 transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-24 text-gray-400 text-lg">
            You haven’t added any hotels yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerHotelInfo;
