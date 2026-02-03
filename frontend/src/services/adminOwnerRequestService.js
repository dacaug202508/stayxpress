import axios from "axios";

const OWNER_REQUEST_BASE_URL =
    "https://localhost:7171/api/owner-requests";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

// ✅ Get ALL owner requests (APPROVED + REJECTED + PENDING)
export const getAllOwnerRequests = () =>
    axios.get(OWNER_REQUEST_BASE_URL, getAuthHeader());

// ✅ Get only PENDING owner requests
export const getPendingOwnerRequests = () =>
    axios.get(`${OWNER_REQUEST_BASE_URL}/pending`, getAuthHeader());

// ✅ Update request status (APPROVE / REJECT)
export const updateOwnerRequestStatus = (requestId, status, adminId) =>
    axios.put(
        `${OWNER_REQUEST_BASE_URL}/${requestId}/status?status=${status}&adminId=${adminId}`,
        {},
        getAuthHeader()
    );
