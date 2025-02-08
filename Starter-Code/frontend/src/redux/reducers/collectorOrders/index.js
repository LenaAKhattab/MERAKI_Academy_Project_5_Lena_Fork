import { createSlice } from "@reduxjs/toolkit";

const collectorOrdersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderDetails: (state, action) => {
      const updatedOrder = action.payload;
      state.orders = state.orders.map((order) => {
        if (order.id === updatedOrder.id) {
          return {
            ...order,
            status: updatedOrder.status,
            last_price:updatedOrder.last_price
          };
        }
        return order;
      });
    },
  },
});

export const { setOrders, setOrderDetails } =
  collectorOrdersSlice.actions;
export default collectorOrdersSlice.reducer;
