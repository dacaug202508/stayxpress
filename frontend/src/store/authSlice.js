import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("token");
let role = localStorage.getItem("role");
let username = localStorage.getItem("username");
let userId = localStorage.getItem("user_id");

export const AUTHROLES = {
  OWNER: "ROLE_OWNER",
  USER: "ROLE_CUSTOMER",
  ADMIN: "ROLE_ADMIN"
};

const initialState = {
  status: !!token,
  role: role || "",
  token: token || null,
  username: username || "",
  userId: userId ? Number(userId) : 0
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, username, role, userId } = action.payload;

      state.status = true;
      state.token = token;
      state.username = username;
      state.role = role;
      state.userId = userId;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", userId);
    },

    logout: (state) => {

      state.status = false;
      state.token = null;
      state.username = "";
      state.role = "";
      state.userId = 0;


      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
