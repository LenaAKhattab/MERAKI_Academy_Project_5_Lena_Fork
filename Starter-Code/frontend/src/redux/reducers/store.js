import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import adminOrdersReducer from "./adminOrders/index";
import collectorOrdersReducer from "./collectorOrders/index";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    adminOrdersReducer: adminOrdersReducer,
    collectorOrdersReducer: collectorOrdersReducer,
  },
});

export default store;
