import axios from "axios";

const BOOKING_BASE_URL = "http://localhost:8082/booking";

export const getBookedRoomsByOwner = (ownerId) => {
  return axios.get(
    `${BOOKING_BASE_URL}/booked-rooms/by-owner/${ownerId}`
  );
};
