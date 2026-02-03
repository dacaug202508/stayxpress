import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchForm from "../common/SearchForm";
import { getAllHotels, getHotelsByCity } from "../../../services/hotelservice";
import { useDebounce } from "use-debounce";
import { FaWifi, FaSwimmingPool, FaCoffee, FaStar, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

export default function SearchPage() {
  const location = useLocation();

  // 🔹 Search State
  const locationState = location.state;
  let navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    location: locationState?.location || "",
    checkIn: locationState?.checkIn || "",
    checkOut: locationState?.checkOut || "",
    guests: locationState?.guests || "2",
  });

  // 🔹 Filter State
  const [filters, setFilters] = useState({
    wifi: false,
    pool: false,
    breakfast: false,
  });

  const [value] = useDebounce(searchData.location, 1000);

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (value !== "") {
        await handleSearch();
      } else {
        let res = await getAllHotels();
        console.log(res.data);
        setHotels(res.data?.data || res.data || []);
      }
      setLoading(false);
    })();
  }, [value]);

  // 🔹 Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSearch = async () => {
    try {
      let res = await getHotelsByCity(value);
      setHotels(res.data?.data || res.data || []);
    } catch (error) {
      setHotels([]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* 🔹 HERO SEARCH SECTION */}
      <div className="w-full bg-blue-900 pb-24 pt-32 px-4 md:px-10 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 opacity-90"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Find your next stay
          </h1>
          <p className="text-blue-200 text-lg mb-8">Search through hundreds of verified properties</p>
        </div>
      </div>

      <div className="px-4">
        <SearchForm
          search={searchData}
          handleChange={handleInputChange}
          handleSearch={handleSearch}
        />
      </div>

      {/* 🔹 CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="md:w-72 space-y-8 sticky top-32 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hidden md:block">
          <div className="flex items-center gap-2 mb-6 text-gray-800 border-b border-gray-100 pb-4">
            <FaFilter className="text-blue-500" />
            <h3 className="text-lg font-bold">Filters</h3>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Amenities</p>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.wifi ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 group-hover:border-blue-400"}`}>
                  {filters.wifi && <span className="text-xs">✓</span>}
                  <input type="checkbox" name="wifi" checked={filters.wifi} onChange={handleFilterChange} className="hidden" />
                </div>
                <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600 transition-colors">
                  <FaWifi /> Free Wifi
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.pool ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 group-hover:border-blue-400"}`}>
                  {filters.pool && <span className="text-xs">✓</span>}
                  <input type="checkbox" name="pool" checked={filters.pool} onChange={handleFilterChange} className="hidden" />
                </div>
                <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600 transition-colors">
                  <FaSwimmingPool /> Pool
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.breakfast ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 group-hover:border-blue-400"}`}>
                  {filters.breakfast && <span className="text-xs">✓</span>}
                  <input type="checkbox" name="breakfast" checked={filters.breakfast} onChange={handleFilterChange} className="hidden" />
                </div>
                <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600 transition-colors">
                  <FaCoffee /> Breakfast Included
                </div>
              </label>
            </div>
          </div>
        </aside>

        {/* Hotel Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {hotels.length} {hotels.length === 1 ? 'Property' : 'Properties'} Found
            </h3>
            <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-auto md:h-64"
                >
                  {/* Hotel Image */}
                  <div className="w-full md:w-72 h-48 md:h-full relative shrink-0">
                    <img
                      src={hotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"}
                      alt={hotel.hotelName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                      City Center
                    </div>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {hotel.hotelName}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FaMapMarkerAlt className="text-blue-500 mr-1" />
                            {hotel.city}, {hotel.country}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm font-bold">
                          <FaStar className="text-yellow-400" />
                          4.5
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {hotel.description || "Experience comfort and style at our premium property, featuring modern amenities and exceptional service."}
                      </p>

                      <div className="flex gap-4 text-xs text-gray-500 font-medium">
                        <span className="px-2 py-1 bg-gray-100 rounded-md">Free Wifi</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md">Pool</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md">Gym</span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-4 md:mt-0 pt-4 border-t md:border-t-0 border-gray-100">


                      <button
                        onClick={() => navigate(`/user/hotels/${hotel.id}/rooms`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                      >
                        View Rooms
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
