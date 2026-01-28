import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchForm from "../common/searchForm";
import { getAllHotels, getHotelsByCity } from "../../../services/hotelservice";
import { useDebounce } from "use-debounce";

export default function SearchPage() {
  const today = new Date().toISOString().split("T")[0];
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

  const [hotels, setHotels] = useState([
    {
      id: 0,
      hotelName: "",
      description: "",
      address: "",
      city: "",
      country: "",
      status: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      // console.log(searchData.location == "");

      if (value != "") {
        handleSearch();
      }

      if (value == "") {
        let res = await getAllHotels();
        console.log(res.data);
        setHotels(res.data);
      }
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
    console.log("Search Data:", searchData);
    console.log("Selected Filters:", filters);
    let res = await getHotelsByCity(value);
    setHotels(res.data);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* 🔹 HERO SEARCH SECTION */}
      <div className="w-full bg-linear-to-br from-sky-50 via-white to-sky-100 py-14 px-4 md:px-10 lg:px-20">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-10">
          Find your next stay
        </h1>

        <SearchForm
          search={searchData}
          handleChange={handleInputChange}
          handleSearch={handleSearch}
          location={location}
        />
      </div>

      {/* 🔹 CONTENT AREA */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-10 flex flex-col md:flex-row gap-10">
        {/* Filters Sidebar */}
        <aside className="md:w-64 space-y-6  top-24 h-fit">
          <h3 className="text-lg font-bold">Filters</h3>

          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">Amenities</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={filters.wifi}
                  onChange={handleFilterChange}
                  className="accent-sky-500 w-4 h-4"
                />
                Free Wifi
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pool"
                  checked={filters.pool}
                  onChange={handleFilterChange}
                  className="accent-sky-500 w-4 h-4"
                />
                Pool
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={filters.breakfast}
                  onChange={handleFilterChange}
                  className="accent-sky-500 w-4 h-4"
                />
                Breakfast Included
              </label>
            </div>
          </div>
        </aside>

        {/* Hotel Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Popular Hotels</h3>
            <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Hotel Image */}
                <div className="h-48 bg-slate-200">
                  <img
                    src={
                      hotel.imageUrl ||
                      "https://via.placeholder.com/400x250?text=Hotel+Image"
                    }
                    alt={hotel.hotelName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hotel Info */}
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-lg text-slate-800 truncate">
                    {hotel.hotelName}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {hotel.city}, {hotel.country}
                  </p>

                  <p className="text-sm text-slate-600 line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        hotel.status === "ACTIVE"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {hotel.status}
                    </span>

                    <button
                      onClick={() => navigate(`/user/hotels/${hotel.id}/rooms`)}
                      className="text-sky-600 font-semibold text-sm hover:underline hover:cursor-pointer"
                    >
                      View Rooms →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
