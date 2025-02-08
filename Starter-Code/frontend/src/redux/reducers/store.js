import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import adminOrdersReducer from "./adminOrders/index"
import orderReducer from "./createOrder/index"; 
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminOrdersReducer:adminOrdersReducer,
    order: orderReducer

  },
});

export default store;

