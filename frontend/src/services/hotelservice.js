/* eslint-disable no-useless-catch */
import axios from "axios";

const BASE_URL = "http://localhost:8082/hotel";

export const getAllHotels = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getallhotels`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const saveHotel = async (hotel) => {
  try {
    const res = await axios.post(`${BASE_URL}/save-hotel`, hotel);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateHotel = async (hotelId, hotel) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/update-hotel/${hotelId}`,
      hotel
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getHotelById = async (hotelId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-by-id?hotelId=${hotelId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteHotel = async (hotelId) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/delete-hotel?hotelId=${hotelId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};


export const getHotelsByOwnerId = async (ownerId) => {
  try {
    console.log(ownerId)
    const res = await axios.get(
      `${BASE_URL}/by-userid/${ownerId}`
    );
    return res;
  } catch (error) {
    throw error;
  }
}

export const getHotelsByCity = async (city) => {
  try {

    const res = await axios.get(`${BASE_URL}/getallhotels-bycity?city=${city}`);
    return res;
  } catch (error) {
    throw error;
  }
}