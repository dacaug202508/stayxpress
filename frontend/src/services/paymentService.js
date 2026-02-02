import axios from "axios";

const PAYMENT_BASE_URL = "https://localhost:7171/api/payments";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create payment
export const makePayment = async (data) => {
  return axios.post(`${PAYMENT_BASE_URL}`, data, getAuthHeader());
};

// Get payment by booking
export const getPaymentByBooking = async (bookingId) => {
  return axios.get(
    `${PAYMENT_BASE_URL}/booking/${bookingId}`,
    getAuthHeader()
  );
};
