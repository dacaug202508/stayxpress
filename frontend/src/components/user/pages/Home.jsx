import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../common/searchForm";
import { getAllHotels } from "../../../services/hotelservice";

function HomePage() {
  const navigate = useNavigate();

  /* ---------------- SEARCH STATE ---------------- */
  const [search, setSearch] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  /* ---------------- HOTEL STATE ---------------- */
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- SEARCH HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "checkIn" && prev.checkOut && prev.checkOut < value) {
        updated.checkOut = "";
      }
      return updated;
    });
  };

  const handleSearch = () => {
    navigate("/user/search", { state: search });
  };

  /* ---------------- FETCH HOTELS ---------------- */
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getAllHotels();

      const hotelList = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

      setHotels(hotelList);
    } catch (error) {
      console.error("Error fetching hotels", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOCAL DESTINATION IMAGES ---------------- */
  const destinationImages = {
    KOKAN: "https://tse4.mm.bing.net/th/id/OIP.FgBB6C4xCozpUnCbMVhLmAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    MUMBAI: "https://tse1.mm.bing.net/th/id/OIP.6_vaYs9NFUsRCnuMpiZbjwHaFA?rs=1&pid=ImgDetMain&o=7&rm=3",
    RAJASTAN: "https://images.ctfassets.net/uwf0n1j71a7j/6bjzME3K7Hv5pmx78Cy86g/4845e4edfa738e8c41ecf47da161d279/best-places-to-visit-in-dubai.png",
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
          {["KOKAN", "MUMBAI", "RAJASTAN"].map((place) => (
            <div
              key={place}
              className="relative h-56 rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={destinationImages[place]}
                alt={place}
                className="w-full h-full object-cover"
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

        {loading ? (
          <p className="text-center text-sky-600">Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p className="text-center text-red-500">No hotels found</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels
              .filter((h) => h.status?.toUpperCase() === "ACTIVE")
              .slice(0, 3)
              .map((hotel) => (
                <div
                  key={hotel.id}
                  className="border border-sky-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  {/* HOTEL IMAGE */}
                  <img
                    src={hotel.imageUrl || "/hotel.jpg"}
                    alt={hotel.hotel_name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-sky-900">
                      {hotel.hotel_name}
                    </h3>

                    <p className="text-sky-600 text-sm mb-2">
                      {hotel.city}, {hotel.country}
                    </p>

                    <p className="text-sky-700 font-bold">City Center</p>

                    <button
                      onClick={() => navigate(`hotels/${hotel.id}/rooms`)}
                      className="mt-3 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
                    >
                      View Rooms
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
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
          onClick={() => navigate("/user/search")}
          className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-sky-100 transition"
        >
          Search Hotels
        </button>
      </section>
    </div>
  );
}

export default HomePage;
