import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface IModalState {
  isOpen: boolean;
  children: ReactNode | null;
}

const initialState: IModalState = {
  isOpen: false,
  children: ReactNode
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ReactNode>) => {
      state.isOpen = true;
      state.children = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.children = null;
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

