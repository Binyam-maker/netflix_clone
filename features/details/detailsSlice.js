import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const detailsSlice = createSlice({
  name: "detail",
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

export const { openModal, closeModal } = detailsSlice.actions;
export default detailsSlice.reducer;
