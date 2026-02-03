import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../reusable/Button";
import { getRoomById } from "../../../services/roomservice";
import { getHotelById } from "../../../services/hotelservice";
import { createBooking } from "../../../services/bookingService";
import { FaUserFriends, FaBed, FaWifi, FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function RoomDetails() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const userId = localStorage.getItem("user_id");

  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    try {
      let res = await getRoomById(roomId);
      setRoom(res.data);

      res = await getHotelById(res.data.hotelId);
      setHotel(res.data.data);
    } catch (error) {
      console.error("Error fetching room", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      // Using browser alert for now as per original
      alert("Please select check-in and check-out dates");
      return;
    }

    try {
      setBookingLoading(true);

      const bookingPayload = {
        customerId: parseInt(userId),
        roomId: room.id,
        checkIn: checkIn,
        checkOut: checkOut,
      };

      const res = await createBooking(bookingPayload);

      alert(`Booking Confirmed! Ref: ${res.data.bookingReference}`);
      navigate("/user/payment/" + res.data.bookingId);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2 gap-0">
        {/* LEFT COLUMN: IMAGE & DETAILS */}
        <div className="relative h-full min-h-[400px]">
          <img
            src={
              room.image ||
              "https://static.leonardo-hotels.com/image/executive-room-with-king-bed_35ba711c8e3052877659372a86e4bb3a_2048x1365_desktop_2.jpeg"
            }
            alt="Room"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{room.roomType}</h1>
            <div className="flex items-center gap-4 text-sm font-medium opacity-90">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-2">
                <FaBed /> Room #{room.roomNumber}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-2">
                <FaUserFriends /> Max {room.maxGuests} Guests
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING FORM */}
        <div className="p-8 md:p-12 flex flex-col h-full bg-white">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Room Details</h2>
            <div className="flex flex-col gap-2 text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span className="font-medium text-gray-700">{hotel?.hotelName}</span>
                <span className="text-gray-400">— {hotel?.city}, {hotel?.country}</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {room.description || "Experience purely refined comfort in our spacious rooms, designed to provide the ultimate relaxation for our guests."}
            </p>
          </div>

          <div className="mt-auto bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Price per night</span>
              <div className="text-3xl font-bold text-blue-600">₹{room.pricePerNight}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="form-control">
                <label className="label text-xs font-bold text-gray-400 uppercase">Check-in</label>
                <div className="relative">
                  <input
                    type="date"
                    className="input input-bordered w-full pl-10 bg-white font-medium text-gray-700 focus:outline-none focus:border-blue-500"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold text-gray-400 uppercase">Check-out</label>
                <div className="relative">
                  <input
                    type="date"
                    className="input input-bordered w-full pl-10 bg-white font-medium text-gray-700 focus:outline-none focus:border-blue-500"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            <Button
              text={bookingLoading ? "Processing Booking..." : "Confirm Booking"}
              css={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2 ${bookingLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'}`}
              onClick={handleBooking}
              disabled={bookingLoading}
            />
            <p className="text-center text-xs text-gray-400 mt-4">No payment required at this step</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
