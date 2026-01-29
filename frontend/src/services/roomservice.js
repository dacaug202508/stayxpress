import axios from "axios";

const ROOM_BASE_URL = "http://localhost:8080/room";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const getAllRooms = async () => {
  return axios.get(`${ROOM_BASE_URL}/get-all-rooms`, getAuthHeader());
};


export const getRoomById = async (roomId) => {
  return axios.get(`${ROOM_BASE_URL}/get-room-byid?roomId=${roomId}`, getAuthHeader());
};


export const saveRoom = async (room) => {
  return axios.post(`${ROOM_BASE_URL}/save-room`, room, getAuthHeader());
};


export const updateRoom = async (room) => {
  return axios.put(`${ROOM_BASE_URL}/update-room`, room, getAuthHeader());
};


export const deleteRoom = async (roomId) => {
  return axios.delete(`${ROOM_BASE_URL}/delete-room?id=${roomId}`, getAuthHeader());
};

export const getRoomsByHotelId = async (hotelid) => {
  return axios.get(`${ROOM_BASE_URL}/get-room-by-hotel?hotelid=${hotelid}`, getAuthHeader());
};
