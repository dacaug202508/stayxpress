import axios from "axios";

async function registerUser(user) {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post("http://localhost:8080/auth/register", user);
        return res;
    } catch (error) {
        throw error;
    }
}

async function loginUser(user) {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post("http://localhost:8080/auth/login", user);
        return res;
    } catch (error) {
        throw error;
    }
}

async function getClaimsFromJwt(token, username) {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(`http://localhost:8080/auth/get-allclaims?username=${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res;
    } catch (error) {
        throw error;
    }
}
 


export { registerUser, loginUser, getClaimsFromJwt };
