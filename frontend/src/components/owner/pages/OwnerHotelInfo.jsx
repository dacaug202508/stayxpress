import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "../../reusable/Button";
import  Button  from "../../reusable/Button";

import {
  getHotelsByOwnerId,
  deleteHotel,
} from "../../../services/hotelservice";

function OwnerHotelInfo() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const ownerId = 1; // 🔴 later replace with JWT

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerId(ownerId);

      // backend response: { data: [...] }
      setHotels(Array.isArray(res.data?.data) ? res.data.data : []);
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
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading hotels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-sky-900 mb-8">
          My Hotels
        </h2>

        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              {/* IMAGE */}
              <img
                src={
                  hotel.image ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                }
                alt={hotel.hotelName}
                className="w-full md:w-64 h-48 object-cover"
              />

              {/* DETAILS */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {hotel.hotelName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        📍 {hotel.city}, {hotel.country}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        hotel.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {hotel.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <p>{hotel.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">City</p>
                      <p>{hotel.city}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Country</p>
                      <p>{hotel.country}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-600 text-sm">
                    {hotel.description}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex gap-3">
                  <Button
                    text="Edit"
                    onClick={() =>
                      navigate(`/owner/update-hotel/${hotel.id}`)
                    }
                    css="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition"
                  />

                  <Button
                    text="Delete"
                    onClick={() => handleDelete(hotel)}
                    css="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            You haven’t added any hotels yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerHotelInfo;
