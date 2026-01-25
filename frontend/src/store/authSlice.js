import { createSlice } from "@reduxjs/toolkit";


let token = localStorage.getItem("token");
let role = localStorage.getItem("role");
let username = localStorage.getItem("user");

export let AUTHROLES = {
  OWNER: "ROLE_OWNER",
  USER: "ROLE_CUSTOMER",
  ADMIN: "ROLE_ADMIN"
}

const initialState = {
  status: token ? true : false,
  role: role ? role : "",
  token: token ? token : null,
  username: username ? username : ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, username, role } = action.payload;

      state.status = true;
      state.token = token;
      state.username = username;
      state.role = role

      localStorage.setItem("token", state.token);
      localStorage.setItem("username", state.username);
      localStorage.setItem("role", state.role);
    },

    logout: (state) => {
      state.status = false;
      state.token = null;

      localStorage.clear();
    },
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
