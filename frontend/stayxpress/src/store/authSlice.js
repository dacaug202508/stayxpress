import { createSlice } from "@reduxjs/toolkit";

export const AUTHROLES = Object.freeze({
  OWNER: "owner",
  ADMIN: "admin",
  USER: "user",
});

/* ---------- Safe hydration ---------- */
let savedState = null;

try {
  const raw = localStorage.getItem("user_data");
  savedState = raw ? JSON.parse(raw) : null;
} catch (err) {
  console.warn("Invalid user_data in localStorage. Clearing it.");
  localStorage.removeItem("user_data");
}

const initialState = savedState ?? {
  status: false,
  role: "",
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload.role;
      state.userData = action.payload.userData;

      // persist clean object (not Immer proxy)
      localStorage.setItem(
        "user_data",
        JSON.stringify({
          status: true,
          role: action.payload.role,
          userData: action.payload.userData,
        })
      );
    },

    logout: (state) => {
      state.status = false;
      state.role = "";
      state.userData = null;
      localStorage.removeItem("user_data");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
