import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../../services/bookingService";
function BookingDetails() {
  const { bookingId } = useParams();
  const userId = localStorage.getItem("userId"); // stored after login

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId, userId);

        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [bookingId, userId]);

  if (!booking) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading booking details...
      </div>
    );
  }

  const nights = new Date(booking.checkOut) - new Date(booking.checkIn);
  const totalNights = nights / (1000 * 60 * 60 * 24);

  const handleDownloadInvoice = () => {
    console.log("🧾 Download invoice for booking:", booking.bookingId);
  };

  const handleContactHotel = () => {
    console.log("📞 Contact hotel for booking:", booking.hotelId);
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Booking Details
            </h2>
            <p className="text-sm text-gray-500">
              Reference ID: {booking.bookingReference}
            </p>
          </div>
          <span
            className={`mt-3 md:mt-0 px-4 py-1 text-sm font-bold rounded-full ${booking.status === "CONFIRMED"
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
            <h3 className="font-semibold text-gray-700 mb-2">Hotel ID</h3>
            <p className="text-lg font-medium text-gray-800">
              {booking.hotelId}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Guests</h3>
            <p className="text-gray-800">Customer ID: {booking.customerId}</p>
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
            <p className="text-sm text-gray-500">Room</p>
            <p className="font-medium text-gray-800">
              Room ID: {booking.roomId}
            </p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Nights</span>
              <span>{totalNights}</span>
            </div>

            <div className="flex justify-between font-bold text-lg text-sky-700 border-t pt-3">
              <span>Total Paid</span>
              <span>${booking.totalPrice}</span>
            </div>

            <div className="text-xs text-gray-500 pt-2">
              Booking Status: {booking.status}
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
