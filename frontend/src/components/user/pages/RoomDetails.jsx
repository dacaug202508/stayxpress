import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../reusable/Button";
import { getRoomById } from "../../../services/roomservice";
import { getHotelById } from "../../../services/hotelservice";
import { createBooking } from "../../../services/bookingService";

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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading room details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8">
        <div className="h-96 md:h-full">
          <img
            src={
              room.image ||
              "https://static.leonardo-hotels.com/image/executive-room-with-king-bed_35ba711c8e3052877659372a86e4bb3a_2048x1365_desktop_2.jpeg"
            }
            alt="Room"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {room.roomType} Room
            </h1>

            <p className="text-gray-500 mt-2">
              Room Number:{" "}
              <span className="font-medium">{room.roomNumber}</span>
            </p>

            <p className="text-2xl text-sky-600 font-bold mt-4">
              ₹{room.pricePerNight}{" "}
              <span className="text-sm text-gray-500">/ night</span>
            </p>

            <div className="mt-6 space-y-3 text-gray-700 text-sm">
              <p>👥 Max Guests: {room.maxGuests}</p>
              <p>🏨 Hotel: {hotel?.hotelName || "—"}</p>
              <p>
                📍 Location: {hotel?.city}, {hotel?.country}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {room.description || "Comfortable stay with modern amenities."}
              </p>
            </div>

            {/* Booking Form */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Check-In</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Check-Out</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              text={bookingLoading ? "Booking..." : "Book Now"}
              css="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold"
              onClick={handleBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
