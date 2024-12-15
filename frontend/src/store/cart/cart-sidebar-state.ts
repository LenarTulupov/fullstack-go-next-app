import { createSlice } from "@reduxjs/toolkit";

interface ICartSidebarState {
  isCartSidebarOpened: boolean;
}

const initialState: ICartSidebarState = {
  isCartSidebarOpened: false,
};

export const cartSidebarSlice = createSlice({
  name: "cartSidebarState",
  initialState,
  reducers: {
    cartSidebarState: (state) => {
      state.isCartSidebarOpened = !state.isCartSidebarOpened;
    },
  },
});

export const { cartSidebarState } = cartSidebarSlice.actions;
export default cartSidebarSlice.reducer;
