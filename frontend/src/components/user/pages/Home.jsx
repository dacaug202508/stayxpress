import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../common/SearchForm";
import { getAllHotels } from "../../../services/hotelservice";
import { FaMapMarkerAlt, FaStar, FaHotel } from "react-icons/fa";

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
    <div className="w-full bg-gray-50 text-gray-800">
      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] md:h-[75vh] bg-blue-900 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3270&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-900/30 to-gray-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto -mt-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-medium mb-6 animate-fade-in-up">
            ✨ Experience Luxury Like Never Before
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
            Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Stay</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Discover handpicked hotels, compare stunning rooms, and book unforgettable experiences with verified reviews.
          </p>
        </div>
      </section>

      {/* SEARCH FORM (Floating) */}
      <div className="px-4">
        <SearchForm
          search={search}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
      </div>

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our most visited locations and find inspiration for your next getaway.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["KOKAN", "MUMBAI", "RAJASTAN"].map((place) => (
            <div
              key={place}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={destinationImages[place]}
                alt={place}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-1">{place}</h3>
                <p className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View 15+ Properties</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="bg-white py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Hotels</h2>
              <p className="text-gray-500">Top rated accommodations for your comfort.</p>
            </div>
            <button onClick={() => navigate("/user/search")} className="hidden md:block btn btn-ghost hover:bg-gray-100 text-blue-600 gap-2">
              View All <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <FaHotel className="mx-auto text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No hotels found at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels
                .filter((h) => h.status?.toUpperCase() === "ACTIVE")
                .slice(0, 3)
                .map((hotel) => (
                  <div
                    key={hotel.id}
                    className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col"
                  >
                    {/* HOTEL IMAGE */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={hotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"}
                        alt={hotel.hotelName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        4.8
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {hotel.hotelName}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm gap-2">
                          <FaMapMarkerAlt className="text-blue-500" />
                          {hotel.city}, {hotel.country}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">
                        {hotel.description || "Experience refined luxury and impeccable service at this premier destination."}
                      </p>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        {/* <div className="text-sm">
                          <span className="block text-gray-400 text-xs uppercase tracking-wider font-semibold">Starting from</span>
                          <span className="text-lg font-bold text-blue-600">$120</span>
                          <span className="text-gray-400 text-xs">/night</span>
                        </div> */}
                        <button
                          onClick={() => navigate(`hotels/${hotel.id}/rooms`)}
                          className="btn btn-sm bg-gray-900 hover:bg-blue-600 text-white border-none rounded-xl px-4 transition-colors shadow-lg shadow-gray-200"
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
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto relative rounded-[2.5rem] overflow-hidden bg-blue-600 text-white shadow-2xl shadow-blue-900/20">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 py-20 px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for your next adventure?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join thousands of travelers who have found their perfect stay with StayXpress. Book today and enjoy exclusive member deals.</p>
            <button
              onClick={() => navigate("/user/search")}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
