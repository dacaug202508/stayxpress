import axios from "axios";

const HOTEL_BASE_URL = "https://localhost:7171/api/hotels";

export const searchHotels = async ({ query, checkIn, checkOut }) => {
  return axios.get(`${HOTEL_BASE_URL}/search`, {
    params: {
      query,
      checkIn,
      checkOut,
    },
  });
};
