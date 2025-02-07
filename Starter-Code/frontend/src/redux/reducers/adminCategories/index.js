import { createSlice } from "@reduxjs/toolkit";


export const AdminCategorySlice = createSlice({
  name: 'adminCategories',
  initialState: {
    categories: [],  
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    }
  }
});

export const { setCategories, addCategory } = AdminCategorySlice.actions;

export default AdminCategorySlice.reducer;
