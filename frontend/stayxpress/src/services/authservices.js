import axios from "axios";

async function registerUser(user) {
    try {
        const res = await axios.post("http://localhost:8080/auth/register", user);
        return res;
    } catch (error) {
        throw error;
    }
}

async function loginUser(user) {
    try {
        const res = await axios.post("http://localhost:8080/auth/login", user);
        return res;
    } catch (error) {
        throw error;
    }
}

export { registerUser, loginUser };
