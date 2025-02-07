import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import adminOrdersReducer from "./adminOrders/index"
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminOrdersReducer:adminOrdersReducer

  },
});

export default store;

