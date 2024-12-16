import { createSlice } from "@reduxjs/toolkit";
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
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal
  }
})

