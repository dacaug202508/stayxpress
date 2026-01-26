import React from "react";
import { useParams } from "react-router-dom";

function BookingDetails() {
  const { bookingId } = useParams(); // from route /bookings/:bookingId

  // Dummy booking data (later fetch using bookingId)
  const booking = {
    id: bookingId || "BK001",
    hotel: "Oceanview Paradise Resort",
    location: "Maldives",
    checkIn: "2026-02-10",
    checkOut: "2026-02-15",
    guests: 2,
    nights: 5,
    roomType: "Deluxe Ocean Suite",
    pricePerNight: 240,
    taxes: 120,
    total: 1320,
    status: "CONFIRMED",
    customerName: "John Doe",
    paymentMethod: "Credit Card",
  };

  const handleDownloadInvoice = () => {
    console.log("🧾 Download invoice for booking:", booking);
  };

  const handleContactHotel = () => {
    console.log("📞 Contact hotel for booking:", booking);
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
            <p className="text-sm text-gray-500">Reference ID: {booking.id}</p>
          </div>
          <span
            className={`mt-3 md:mt-0 px-4 py-1 text-sm font-bold rounded-full ${
              booking.status === "CONFIRMED"
                ? "bg-green-100 text-green-700"
                : booking.status === "COMPLETED"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Stay Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Hotel</h3>
            <p className="text-lg font-medium text-gray-800">{booking.hotel}</p>
            <p className="text-sm text-gray-500">📍 {booking.location}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Guest</h3>
            <p className="text-gray-800">{booking.customerName}</p>
            <p className="text-sm text-gray-500">{booking.guests} Guests</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Check-In</p>
            <p className="font-medium text-gray-800">{booking.checkIn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Check-Out</p>
            <p className="font-medium text-gray-800">{booking.checkOut}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room Type</p>
            <p className="font-medium text-gray-800">{booking.roomType}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>
                ${booking.pricePerNight} × {booking.nights} nights
              </span>
              <span>${booking.pricePerNight * booking.nights}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Taxes & Fees</span>
              <span>${booking.taxes}</span>
            </div>

            <div className="flex justify-between font-bold text-lg text-sky-700 border-t pt-3">
              <span>Total Paid</span>
              <span>${booking.total}</span>
            </div>

            <div className="text-xs text-gray-500 pt-2">
              Paid via {booking.paymentMethod}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleDownloadInvoice}
            className="px-5 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition"
          >
            Download Invoice
          </button>

          <button
            onClick={handleContactHotel}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Contact Hotel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
