import axios from "axios";

const OWNER_REQUEST_BASE_URL = "https://localhost:7171/api/admin/owner-requests";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const updateOwnerRequestStatus = (requestId, status, adminId) => {
    return axios.patch(
        `${OWNER_REQUEST_BASE_URL}/${requestId}/status?status=${status}&adminId=${adminId}`,
        {},
        getAuthHeader()
    );
};


// Get all pending owner requests
export const getPendingOwnerRequests = async () => {
    return axios.get(`${OWNER_REQUEST_BASE_URL}/pending`, getAuthHeader());
};

// Approve / Reject owner request
export const reviewOwnerRequest = async (requestId, adminId, approve) => {
    return axios.post(
        `${OWNER_REQUEST_BASE_URL}/${requestId}/review?adminId=${adminId}&approve=${approve}`,
        {},
        getAuthHeader()
    );
};
