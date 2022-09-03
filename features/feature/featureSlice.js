import { createSlice } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";

// random number generator b/n intervals
const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const initialState = {
  mainData: {},
  featureItem: {},
  isLoading: true,
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    addMainData: (state, action) => {
      state.mainData = action.payload;
      state.featureItem = [
        ...action.payload.trendingMovie,
        ...action.payload.trendingTV,
      ][randomIntFromInterval(0, 39)];
      state.isLoading = false;
    },
    clearFeature: (state) => {
      state.mainData = {};
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.feature.mainData) {
        return state;
      }
      (state.mainData = action.payload.feature.mainData),
        (state.featureItem = action.payload.feature.featureItem),
        (state.isLoading = false);
    },
  },
});

export const { addMainData, clearFeature } = featureSlice.actions;
export default featureSlice.reducer;
