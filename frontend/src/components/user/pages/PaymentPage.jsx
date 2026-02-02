import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import { makePayment, getPaymentByBooking } from "../../../services/paymentService";
import { getUserBookings } from "../../../services/bookingService";

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
      navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data || "Payment failed");
    }
  };

  if (loading) return <div className="p-10">Loading payment...</div>;

  if (!booking) return <div className="p-10 text-red-500">Booking not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold">Payment</h2>

        {/* Booking Summary */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><b>Booking Ref:</b> {booking.bookingReference}</p>
          <p><b>Hotel ID:</b> {booking.hotelId}</p>
          <p><b>Total Amount:</b> ₹{booking.totalPrice}</p>
          <p><b>Status:</b> {booking.status}</p>
        </div>

        {paid ? (
          <div className="text-green-600 font-semibold">
            Payment already completed
          </div>
        ) : (
          <>
            {/* Payment Method */}
            <div>
              <label className="block mb-1 font-medium">Payment Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="CARD">Card</option>
                <option value="UPI">UPI</option>
                <option value="NET_BANKING">Net Banking</option>
              </select>
            </div>

            <Button
              text={`Pay ₹${booking.totalPrice}`}
              css="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              onClick={handlePayment}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
