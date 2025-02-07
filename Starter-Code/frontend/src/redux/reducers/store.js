import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import adminOrdersReducer from "./adminOrders/index"
import  AdminCategoryReducer from "./adminCategories";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminOrdersReducer: adminOrdersReducer,
    adminCategories: AdminCategoryReducer, 
  },
});

export default store;

