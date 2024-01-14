import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state: ModalState) => {
      state.isOpen = !state.isOpen
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal } = modalSlice.actions;

// Selectors -> retrieving items in state to use in different components
export const selectModalValue = (state: RootState) => state.modal?.isOpen;
export default modalSlice.reducer;
