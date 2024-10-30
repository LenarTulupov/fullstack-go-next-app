import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "@/types/product.interface";
import { RootState } from '../store';

interface IFavoritesState {
  favorites: IProduct[];
}

const initialState: IFavoritesState = {
  favorites: [],
}

export const favoritesSlice = createSlice({
  name: 'favoritesState',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const exists = state.favorites.some(item => item.id === product.id);

      if(exists) {
        state.favorites = state.favorites.filter(item => item.id !== product.id);
      } else {
        state.favorites.push(product);
      }
    }
  }
})

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state: RootState) => 
  state.favoritesState.favorites;
export const isFavorite = (state: RootState, productId: number) => 
  state.favoritesState.favorites.some(item => item.id === productId);
export default favoritesSlice.reducer;