import { IProduct } from "@/types/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFavoriteState {
  favorites: IProduct[];
}

const initialState: IFavoriteState = {
  favorites: [],
};

export const favoriteButtonSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IProduct>) => {
      const isAlreadyFavorite = state.favorites.find(product => product.id === action.payload.id);
      if (!isAlreadyFavorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(product => product.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteButtonSlice.actions;

export const selectFavoriteProducts = (state: RootState) => state.favorite.favorites;

export default favoriteButtonSlice.reducer;