import React, { useState } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomsByHotelId } from "../../../services/roomservice";

function OwnerBooking() {
  // 🔹 Dummy bookings (based on YOUR schema)
  const [bookings] = useState([
    {
      id: 1,
      booking_reference: "BK-2026-001",
      customer_id: 12,
      room_id: 101,
      room_number: "101",
      room_type: "DELUXE",
      hotel_name: "Hotel Sunrise",
      check_in_date: "2026-02-10",
      check_out_date: "2026-02-12",
      booking_status: "BOOKED",
      total_price: 7000,
      created_at: "2026-01-20",
      updated_at: "2026-01-20",
    },
    {
      id: 2,
      booking_reference: "BK-2026-002",
      customer_id: 18,
      room_id: 201,
      room_number: "201",
      room_type: "SUITE",
      hotel_name: "Hotel Ocean View",
      check_in_date: "2026-02-15",
      check_out_date: "2026-02-18",
      booking_status: "BOOKED",
      total_price: 16500,
      created_at: "2026-01-22",
      updated_at: "2026-01-22",
    },
  ]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRoomsByHotelId(hotelId);
        console.log("Rooms:", res.data);
        setRooms(res.data || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    })();
  }, [hotelId]);

  // return (
  //   <div className="w-full min-h-full p-6 bg-sky-50">

  //     <h1 className="text-2xl font-semibold text-gray-800 mb-6">
  //       Booked Rooms
  //     </h1>

  //     <div className="card bg-base-100 shadow-md">
  //       <div className="card-body p-0">

  //         <div className="overflow-x-auto">
  //           <table className="table">

  //             <thead className="bg-gray-50">
  //               <tr>
  //                 <th>#</th>
  //                 <th>Booking Ref</th>
  //                 <th>Hotel</th>
  //                 <th>Room</th>
  //                 <th>Check-In</th>
  //                 <th>Check-Out</th>
  //                 <th>Status</th>
  //                 <th>Total Price</th>
  //               </tr>
  //             </thead>

  //             <tbody>
  //               {bookings.length > 0 ? (
  //                 bookings.map((b, index) => (
  //                   <tr key={b.id}>
  //                     <th>{index + 1}</th>
  //                     <td className="font-medium">
  //                       {b.booking_reference}
  //                     </td>
  //                     <td>{b.hotel_name}</td>
  //                     <td>
  //                       {b.room_number} ({b.room_type})
  //                     </td>
  //                     <td>{b.check_in_date}</td>
  //                     <td>{b.check_out_date}</td>
  //                     <td>
  //                       <span className="badge badge-success badge-outline">
  //                         {b.booking_status}
  //                       </span>
  //                     </td>
  //                     <td>₹{b.total_price}</td>
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan="8" className="text-center py-6 text-gray-500">
  //                     No bookings found
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>

  //           </table>
  //         </div>
  //       </div>
  //     </div>

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-sky-800">Rooms Available</h2>

      {rooms.length === 0 ? (
        <p className="text-gray-500">No rooms found for this hotel.</p>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col overflow-hidden"
            >
              {/* Room Image Placeholder */}
              <div className="h-44 bg-slate-200 relative">
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
                    room.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {room.isActive ? "Available" : "Unavailable"}
                </span>
                <img src={room.image} alt="" className="h-full w-full" />
              </div>

              {/* Room Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Room {room.roomNumber} — {room.roomType}
                </h3>

                <p className="text-sm text-gray-600">
                  👥 Up to{" "}
                  <span className="font-semibold">{room.maxGuests}</span> guests
                </p>

                <p className="text-sky-600 font-bold text-lg mt-2">
                  ₹{room.pricePerNight}{" "}
                  <span className="text-sm text-gray-500">/ night</span>
                </p>

                <div className="mt-auto pt-4">
                  <button
                    disabled={!room.isActive}
                    onClick={() => console.log("Booking room:", room)}
                    className={`w-full py-2 rounded-lg font-semibold transition ${
                      room.isActive
                        ? "bg-sky-600 text-white hover:bg-sky-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {room.isActive ? "Book Now" : "Not Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerBooking;
