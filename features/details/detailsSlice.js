import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  title: "",
  poster: "",
  overview: "",
  genre: "",
  release_date: "",
  vote_average: "",
  vote_count: "",
};

const detailsSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const {
        poster,
        title,
        overview,
        genre,
        release_date,
        vote_average,
        vote_count,
      } = payload;
      state.isModalOpen = true;
      state.overview = overview;
      state.title = title;
      state.poster = poster;
      state.genre = genre;
      state.release_date = release_date;
      state.vote_average = vote_average;
      state.vote_count = vote_count;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = detailsSlice.actions;
export default detailsSlice.reducer;
