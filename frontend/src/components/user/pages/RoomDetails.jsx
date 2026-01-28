import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../reusable/Button";
import { getRoomById } from "../../../services/roomservice";
import { getHotelById } from "../../../services/hotelservice";

function RoomDetails() {
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    try {
      let res = await getRoomById(roomId);
      console.log(res.data);
      setRoom(res.data);

      res = await getHotelById(res.data.hotelId);
      console.log(res.data.data);
      setHotel(res.data.data);
    } catch (error) {
      console.error("Error fetching room", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading room details...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Room not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8">
        {/* ROOM IMAGE */}
        <div className="h-96 md:h-full">
          <img
            src={
              room.image ||
              "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200"
            }
            alt="Room"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ROOM DETAILS */}
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
              <p>🏨 Hotel: {hotel.hotelName || "—"}</p>
              <p>
                📍 Location: {hotel.city}, {hotel.country}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {room.description || "Comfortable stay with modern amenities."}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button
              text="Check Availability"
              css="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-lg font-semibold"
              onClick={() =>
                console.log("Check availability for room", room.id)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
