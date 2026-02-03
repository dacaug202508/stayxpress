import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotelById } from "../../../services/hotelservice";
import { FaMapMarkerAlt, FaStar, FaSwimmingPool, FaWifi, FaParking, FaUtensils, FaConciergeBell, FaSpa } from "react-icons/fa";

function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getHotelById(hotelId);
        setHotel(res.data?.data || res.data);
      } catch (error) {
        console.error("Error fetching hotel details", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500 text-lg">Hotel not found.</p>
      </div>
    );
  }

  // Dummy amenities for display (if backend doesn't provide them yet)
  const amenities = [
    { icon: <FaWifi />, name: "Free Wifi" },
    { icon: <FaSwimmingPool />, name: "Infinity Pool" },
    { icon: <FaUtensils />, name: "Restaurant" },
    { icon: <FaParking />, name: "Free Parking" },
    { icon: <FaConciergeBell />, name: "24/7 Service" },
    { icon: <FaSpa />, name: "Luxury Spa" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO BANNER */}
      <div className="relative h-[50vh] w-full">
        <img
          src={hotel.imageUrl || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200"}
          alt={hotel.hotelName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto">
          <div className="max-w-5xl">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Premium Resort</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{hotel.hotelName}</h1>
            <div className="flex items-center text-white/90 gap-4 text-sm md:text-base">
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-blue-400" /> {hotel.city}, {hotel.country}</span>
              <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> 4.8 (120 Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 -mt-8 relative z-10 mb-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* ABOUT SECTION */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Hotel</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {hotel.description || "Experience world-class service and luxury at this stunning property. Whether you are here for business or leisure, we offer the best amenities to make your stay unforgettable."}
              </p>
            </section>

            {/* AMENITIES SECTION */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ACTION CARD */}
          <div className="bg-blue-50 rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in staying here?</h3>
            <p className="text-gray-600 mb-6 text-sm">Check available rooms and secure your booking today.</p>

            <button
              onClick={() => navigate(`/user/hotels/${hotelId}/rooms`)}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 text-lg"
            >
              View Available Rooms
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">No validation required to view rooms</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
