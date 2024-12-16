import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface IModalState {
  isOpen: boolean;
  content: ReactNode | null;
}

const initialState: IModalState = {
  isOpen: false,
  content: null
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ReactNode>) => {
      state.isOpen = true,
      state.content = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
    }
  }
})

