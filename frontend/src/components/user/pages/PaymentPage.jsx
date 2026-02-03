import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import { makePayment, getPaymentByBooking } from "../../../services/paymentService";
import { getUserBookings } from "../../../services/bookingService";
import { FaCreditCard, FaLock, FaCheckCircle, FaRupeeSign } from "react-icons/fa";

function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("CARD");
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    loadBooking();
    checkPayment();
  }, []);

  const loadBooking = async () => {
    const res = await getUserBookings(userId);
    const b = res.data.find((x) => x.bookingId === Number(bookingId));
    setBooking(b);
    setLoading(false);
  };

  const checkPayment = async () => {
    try {
      const res = await getPaymentByBooking(bookingId);
      if (res.data) setPaid(true);
    } catch (err) {
      // no payment yet (expected)
    }
  };

  const handlePayment = async () => {
    try {
      await makePayment({
        bookingId: booking.bookingId,
        paymentMethod: method,
      });

      alert("Payment Successful!");
      navigate("/user/booking");
    } catch (err) {
      alert(err.response?.data || "Payment failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <span className="loading loading-spinner loading-lg text-blue-600"></span>
    </div>
  );

  if (!booking) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 text-red-500">
      Booking not found
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-2">Secure Payment</h2>
          <p className="text-blue-100 flex items-center justify-center gap-2 text-sm opacity-90"><FaLock size={12} /> SSL Encrypted Transaction</p>
        </div>

        <div className="p-8">
          {/* Booking Summary */}
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Booking Ref:</span>
                <span className="font-bold text-gray-900">{booking.bookingReference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Hotel ID:</span>
                <span className="font-bold text-gray-900">{booking.hotelId}</span>
              </div>
              {/* Divider */}
              <div className="h-px bg-blue-100 my-2"></div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-800 font-bold">Total Amount:</span>
                <span className="font-bold text-blue-600 flex items-center"><FaRupeeSign size={14} />{booking.totalPrice}</span>
              </div>
            </div>
          </div>

          {paid ? (
            <div className="text-center py-10 bg-green-50 rounded-2xl border border-green-100">
              <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-green-700 font-bold text-xl mb-1">Payment Completed</h3>
              <p className="text-green-600/80 text-sm">This booking has been fully paid.</p>
              <button onClick={() => navigate("/user/booking")} className="mt-4 text-green-700 font-semibold text-sm hover:underline">Return to My Bookings</button>
            </div>
          ) : (
            <>
              {/* Payment Method */}
              <div className="mb-8">
                <label className="block mb-2 font-bold text-gray-700 text-sm">Select Payment Method</label>
                <div className="relative">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="select w-full h-14 pl-12 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 rounded-xl text-gray-700 font-medium appearance-none"
                  >
                    <option value="CARD">Credit / Debit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="NET_BANKING">Net Banking</option>
                  </select>
                  <FaCreditCard className="absolute left-4 top-4.5 text-gray-400 text-lg pointer-events-none" />
                </div>
              </div>

              <Button
                text={`Pay ₹${booking.totalPrice}`}
                css="w-full bg-gray-900 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={handlePayment}
              />

              <p className="text-center text-xs text-gray-400 mt-6 max-w-xs mx-auto">
                By confirming payment, you agree to our Terms of Service and Cancellation Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
