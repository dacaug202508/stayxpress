import axios from "axios";

const BASE_URL = "http://localhost:8080/hotel";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllHotels = async () => {
  try {
    return await axios.get(`${BASE_URL}/getallhotels`, getAuthHeader());
  } catch (error) {
    throw error;
  }
};

export const saveHotel = async (hotel) => {
  try {
    return await axios.post(`${BASE_URL}/save-hotel`, hotel, getAuthHeader());
  } catch (error) {
    throw error;
  }
};

export const updateHotel = async (hotelId, hotel) => {
  try {
    return await axios.put(
      `${BASE_URL}/update-hotel/${hotelId}`,
      hotel,
      getAuthHeader()
    );
  } catch (error) {
    throw error;
  }
};

export const getHotelById = async (hotelId) => {
  try {
    return await axios.get(
      `${BASE_URL}/get-by-id?hotelId=${hotelId}`,
      getAuthHeader()
    );
  } catch (error) {
    throw error;
  }
};

export const deleteHotel = async (hotelId) => {
  try {
    return await axios.delete(
      `${BASE_URL}/delete-hotel?hotelId=${hotelId}`,
      getAuthHeader()
    );
  } catch (error) {
    throw error;
  }
};

export const getHotelsByOwnerId = async (ownerId) => {
  try {

    console.log(getAuthHeader().headers.Authorization)

    return await axios.get(
      `${BASE_URL}/by-userid/${ownerId}`,
      getAuthHeader()
    );
  } catch (error) {
    throw error;
  }
};

export const getHotelsByCity = async (city) => {
  try {
    return await axios.get(
      `${BASE_URL}/getallhotels-bycity?city=${city}`,
      getAuthHeader()
    );
  } catch (error) {
    throw error;
  }
};
