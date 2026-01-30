import axios from "axios";

const ADMIN_HOTEL_BASE_URL = "https://localhost:7171/api/admin/hotels";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get all hotels
export const getAllHotelsAdmin = async () => {
    return axios.get(`${ADMIN_HOTEL_BASE_URL}`, getAuthHeader());
};

// Get hotels by owner
export const getHotelsByOwnerAdmin = async (ownerId) => {
    return axios.get(`${ADMIN_HOTEL_BASE_URL}/owner/${ownerId}`, getAuthHeader());
};

// Activate / Deactivate hotel
export const updateHotelStatus = async (hotelId, status) => {
    return axios.patch(`${ADMIN_HOTEL_BASE_URL}/${hotelId}/status?status=${status}`, {}, getAuthHeader());
};
