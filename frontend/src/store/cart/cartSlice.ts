import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types/product.interface";
import { ISize } from "@/types/sizes.interface";
import { RootState } from "../store";

interface ICartItem {
  product: IProduct;
  size: ISize;
  quantity: number;
}

type TypeCart = {
  cart: ICartItem[];
};

const initialState: TypeCart = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: IProduct;
        size: ISize;
      }>
    ) => {
      const { product, size } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id && item.size.id === size.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ product, size, quantity: 1 });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        product: IProduct;
        size: ISize;
      }>
    ) => {
      const { product, size } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === product.id && item.size.id === size.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cartState.cart;
export default cartSlice.reducer;
