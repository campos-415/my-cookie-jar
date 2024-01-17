import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FooterState {
  isCracked: boolean;
}

const initialState: FooterState = {
  isCracked: false,
};

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    crackEgg: (state: FooterState) => {
      state.isCracked = !state.isCracked
    },
  },
});

// Action creators are generated for each case reducer function
export const { crackEgg } = footerSlice.actions;

// Selectors -> retrieving items in state to use in different components
export const selectFooterValue = (state: RootState) => state.footer?.isCracked;
export default footerSlice.reducer;
