import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    roleId: localStorage.getItem("roleId") || null,
    firstName: localStorage.getItem("firstName") || null,  
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);

      state.roleId = action.payload.roleId; 
      localStorage.setItem("roleId", action.payload.roleId);

      state.firstName = action.payload.firstName;  
      localStorage.setItem("firstName", action.payload.firstName); 

      state.isLoggedIn = true;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setName: (state, action) => {
      state.firstName = action.payload;
      localStorage.setItem("firstName", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.roleId = null; 
      state.firstName = null; 
      state.isLoggedIn = false;
      localStorage.clear(); 
    },
  },
});

export const { setLogin, setUserId, setLogout } = authSlice.actions;
export default authSlice.reducer;
