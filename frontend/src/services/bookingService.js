import axios from "axios";

const BOOKING_BASE_URL = "https://localhost:7171/api/bookings";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get bookings for owner’s hotels (used in OwnerBooking page)
export const getBookedRoomsByOwner = async (ownerId) => {
  return axios.get(`${BOOKING_BASE_URL}/owner/${ownerId}`, getAuthHeader());
};


// Check room availability
export const checkRoomAvailability = async (data) => {
  return axios.post(`${BOOKING_BASE_URL}/availability`, data, getAuthHeader());
};

// Create booking
export const createBooking = async (booking) => {
  return axios.post(`${BOOKING_BASE_URL}`, booking, getAuthHeader());
};

// Get bookings for a user
export const getUserBookings = async (userId) => {
  return axios.get(`${BOOKING_BASE_URL}/user/${userId}`, getAuthHeader());
};

// Get bookings for owner’s hotels
export const getOwnerBookings = async (ownerId) => {
  return axios.get(`${BOOKING_BASE_URL}/owner/${ownerId}`, getAuthHeader());
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  return axios.patch(`${BOOKING_BASE_URL}/${bookingId}/cancel`, {}, getAuthHeader());
};

export const getBookingById = async (bookingId, userId) => {
  const res = await axios.get(
    `${BOOKING_BASE_URL}/user/${userId}`,
    getAuthHeader()
  );
  return res.data.find((b) => b.bookingId === parseInt(bookingId));
};

