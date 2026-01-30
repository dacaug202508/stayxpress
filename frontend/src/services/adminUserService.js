import axios from "axios";

const ADMIN_USER_BASE_URL = "https://localhost:7171/api/admin/users";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get all users
export const getAllUsers = async () => {
    return axios.get(`${ADMIN_USER_BASE_URL}`, getAuthHeader());
};

export const getAllUsersAdmin = async () => {
    return axios.get(ADMIN_USER_BASE_URL, getAuthHeader());
};


// Activate / Disable user
export const updateUserStatus = async (userId, status) => {
    return axios.patch(`${ADMIN_USER_BASE_URL}/${userId}/status?status=${status}`, {}, getAuthHeader());
};
