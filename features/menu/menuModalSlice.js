import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const menuModalSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = menuModalSlice.actions;
export default menuModalSlice.reducer;
