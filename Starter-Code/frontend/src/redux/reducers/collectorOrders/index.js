import { createSlice } from "@reduxjs/toolkit";

const collectorOrdersSlice = createSlice({
  name: "orders ",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderStatus: (state, action) => {
      const updatedOrder = action.payload;
      state.orders = state.orders.map((order) => {
        if (order.id === updatedOrder.id) {
          return {
            ...order,
            status: updatedOrder.status,
          };
        }
        return order;
      });
    },
  },
});

export const { setOrders, setOrderStatus } =
  collectorOrdersSlice.actions;
export default collectorOrdersSlice.reducer;
