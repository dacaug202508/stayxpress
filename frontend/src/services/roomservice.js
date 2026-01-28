import axios from "axios";

const ROOM_BASE_URL = "http://localhost:8082/room";

// ✅ Get all rooms
export const getAllRooms = async () => {
  return axios.get(`${ROOM_BASE_URL}/get-all-rooms`);
};

// ✅ Get room by ID
export const getRoomById = async (roomId) => {
  return axios.get(`${ROOM_BASE_URL}/get-room/${roomId}`);
};

// ✅ Save room
export const saveRoom = async (room) => {
  return axios.post(`${ROOM_BASE_URL}/save-room`, room);
};

// ✅ Update room
export const updateRoom = async (room) => {
  return axios.put(`${ROOM_BASE_URL}/update-room`, room);
};

// ✅ Delete room
export const deleteRoom = async (roomId) => {
  return axios.delete(`${ROOM_BASE_URL}/delete-room?id=${roomId}`);
};

// 🆕 Get rooms by hotel ID (REQUIRED for dropdown filter)
export const getRoomsByHotelId = async (hotelId) => {
  return axios.get(
    `${ROOM_BASE_URL}/get-by-hotel?hotelId=${hotelId}`
  );
};
