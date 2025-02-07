import { createSlice } from "@reduxjs/toolkit";

const adminOrdersSlice = createSlice({
  name: "orders ",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;
