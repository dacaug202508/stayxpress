import axios from "axios";

const BASE_URL = "https://localhost:7171/api/users";
const OWNER_REQ_URL = "https://localhost:7171/api/owner-requests";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUserProfile = (userId) =>
    axios.get(`${BASE_URL}/${userId}`, getAuthHeader());

export const updateUserProfile = (userId, data) =>
    axios.put(`${BASE_URL}/${userId}`, data, getAuthHeader());

export const requestOwnerAccess = (userId) =>
    axios.post(`${OWNER_REQ_URL}/${userId}`, {}, getAuthHeader());
