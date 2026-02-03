import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import {
  getHotelsByOwnerId,
  deleteHotel,
} from "../../../services/hotelservice";
import { useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaTrash,
  FaEdit,
  FaHotel,
  FaCity
} from "react-icons/fa";

function OwnerHotelInfo() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  let state = useSelector((state) => state.auth);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getHotelsByOwnerId(state.userId);
      console.log(res.data);
      setHotels(res.data.data || []);
    } catch (error) {
      console.error("Error fetching hotels", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (hotel) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await deleteHotel(hotel.id);
      setHotels((prev) => prev.filter((h) => h.id !== hotel.id));
    } catch (error) {
      console.error("Error deleting hotel", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="loading loading-spinner loading-lg text-blue-600"></div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading your properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
              <FaHotel className="text-xl" />
            </span>
            My Hotels
          </h2>
          <p className="text-gray-500 mt-2 ml-1">Manage and update your property details</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-6 relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className={`absolute top-6 left-6 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm backdrop-blur-md ${hotel.status === "ACTIVE"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
                }`}>
                {hotel.status}
              </div>

              {/* IMAGE SECTION */}
              <div className="md:w-80 h-56 md:h-64 rounded-2xl overflow-hidden shrink-0 relative">
                <img
                  src={
                    hotel.imageUrl ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  }
                  alt={hotel.hotelName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* CONTENT SECTION */}
              <div className="flex-1 flex flex-col pt-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {hotel.hotelName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 mt-1 font-medium">
                      <FaMapMarkerAlt className="text-blue-500" />
                      {hotel.city}, {hotel.country}
                    </div>
                  </div>
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-white rounded-lg text-blue-500 shadow-sm">
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</p>
                      <p className="text-sm font-medium text-gray-700">{hotel.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-white rounded-lg text-blue-500 shadow-sm">
                      <FaGlobe size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Country</p>
                      <p className="text-sm font-medium text-gray-700">{hotel.country}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                  {hotel.description}
                </p>

                {/* ACTIONS */}
                <div className="mt-auto pt-6 flex gap-3 justify-end md:justify-start">

                  <Button
                    onClick={() => navigate(`/owner/update-hotel/${hotel.id}`)}
                    css="btn btn-sm md:btn-md bg-blue-600 hover:bg-blue-700 text-white border-none gap-2 shadow-lg shadow-blue-500/20 transition-all font-medium px-6"
                    text={"Update Hotel"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm text-center">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              <FaHotel className="text-4xl text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No properties found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">
              You haven't listed any hotels yet. Get started by adding your first property.
            </p>
            <Button
              text="Add New Hotel"
              css="mt-6 btn btn-primary shadow-lg shadow-blue-500/30"
              onClick={() => navigate('/owner/add-hotel')}
            />

          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerHotelInfo;
