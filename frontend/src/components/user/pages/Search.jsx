import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../common/searchForm";

export default function SearchPage() {
  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();

  // 🔹 Search State
  const locationState = location.state;

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

  useEffect(() => {
    if (locationState) {
      console.log("🔍 Running search with:", locationState);
      // Here later you will call backend API
    }
  }, []);

  // 🔹 Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSearch = () => {
    console.log("Search Data:", searchData);
    console.log("Selected Filters:", filters);
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
            {[1, 2, 3, 4, 5, 6].map((hotel) => (
              <div
                key={hotel}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition"
              >
                <div className="h-48 bg-slate-200 rounded-t-xl"></div>
                <div className="p-4">
                  <h4 className="font-bold text-lg">
                    Oceanview Paradise Resort
                  </h4>
                  <p className="text-sm text-slate-500 mb-2">Maldives</p>
                  <p className="text-sky-600 font-bold">
                    $240 <span className="text-sm text-slate-500">/ night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
