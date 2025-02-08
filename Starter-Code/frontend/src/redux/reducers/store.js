import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import adminOrdersReducer from "./adminOrders/index";
import orderReducer from "./createOrder/index";
import AdminCategoryReducer from "./adminCategories";
import collectorOrdersReducer from "./collectorOrders";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminOrdersReducer: adminOrdersReducer,
    collectorOrdersReducer: collectorOrdersReducer,
    adminCategories: AdminCategoryReducer,
    order: orderReducer,
  },
});

export default store;
