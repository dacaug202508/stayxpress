import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../common/searchForm";
import { getAllHotels } from "../../../services/hotelservice";

function HomePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => {
      const updated = { ...prev, [name]: value };

      // Reset checkout if invalid
      if (name === "checkIn" && prev.checkOut && prev.checkOut < value) {
        updated.checkOut = "";
      }

      return updated;
    });
  };

  const handleSearch = () => {
    console.log(" Home Search Data:", search);
    navigate("/user/search", {
      state: search,
    });
  };

  return (
    <div className="w-full bg-sky-50 text-gray-800">
      {/* HERO */}
      <section className="w-full bg-gradient-to-br from-sky-200 via-sky-100 to-white py-20 px-4 md:px-10 lg:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="text-sky-700 text-lg mb-10">
          Discover hotels, compare rooms, and book unforgettable experiences.
        </p>

        {/* SEARCH Form */}
        <SearchForm
          search={search}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-16">
        <h2 className="text-2xl font-bold text-sky-800 mb-8 text-center">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Maldives", "Paris", "Dubai"].map((place) => (
            <div
              key={place}
              onClick={() => console.log("📍 Destination clicked:", place)}
              className="relative h-56 rounded-xl overflow-hidden shadow-md cursor-pointer group"
            >
              <img
                src={`https://source.unsplash.com/600x400/?${place},travel`}
                alt={place}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{place}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
        <h2 className="text-2xl font-bold text-sky-800 mb-10 text-center">
          Featured Hotels
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((hotel) => (
            <div
              key={hotel}
              className="border border-sky-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <img
                src={`https://source.unsplash.com/600x400/?hotel,luxury,room`}
                alt="hotel"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-sky-900">
                  Luxury Hotel {hotel}
                </h3>
                <p className="text-sky-600 text-sm mb-2">City Center</p>
                <p className="text-sky-700 font-bold">$120 / night</p>

                <button
                  onClick={() => console.log("🏨 View hotel clicked:", hotel)}
                  className="mt-3 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
                >
                  View Rooms
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready for your next adventure?
        </h2>
        <p className="mb-6 text-sky-100">
          Book your stay today and enjoy exclusive deals.
        </p>

        <button
          onClick={() => {
            console.log("🚀 CTA Search Clicked");
            navigate("/user/search");
          }}
          className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-sky-100 transition"
        >
          Search Hotels
        </button>
      </section>
    </div>
  );
}

export default HomePage;
