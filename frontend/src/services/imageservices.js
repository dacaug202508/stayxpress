import axios from "axios";

const IMAGE_BASE_URL = "http://localhost:8080/image";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export function uploadImage(formData) {
    return axios.post(
        `${IMAGE_BASE_URL}/upload`,
        formData,
        {
            ...getAuthHeader(),
            headers: {
                ...getAuthHeader().headers,
                "Content-Type": "multipart/form-data",
            },
        }
    );
}

export function getImage(entityType, entityID) {
    return axios.get(
        `${IMAGE_BASE_URL}/?entityType=${entityType}&&entityId=${entityID}`,
        getAuthHeader()
    );
}
