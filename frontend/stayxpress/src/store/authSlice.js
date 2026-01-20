import { createSlice } from "@reduxjs/toolkit";


let token = localStorage.getItem("token");


const initialState = {
  status: token ? true : false,
  token: token ? token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;

      state.status = true;
      state.token = token;


      localStorage.setItem("token", token);
    },

    logout: (state) => {
      state.status = false;
      state.token = null;

      localStorage.removeItem("token");
    },
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
