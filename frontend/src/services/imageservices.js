import axios from "axios";

const IMAGE_BASE_URL = "http://localhost:8082/image";

export function uploadImage(formData) {

    console.log(formData.get("entityId"))

    return axios.post(`${IMAGE_BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export function getImage(entityType, entityID) {
    return axios.get(`${IMAGE_BASE_URL}/?entityType=${entityType}&&entityId=${entityID}`)
}