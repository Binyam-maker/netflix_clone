import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=1f5551cada1a3a631267a5841ebe5203`;
const initialState = {
  featureItems: {},
  isLoading: true,
};

export const getFeatureItems = createAsyncThunk(
  "discover/getFeatureItems",
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    clearFeature: (state) => {
      state.featureItems = [];
    },
  },
  extraReducers: {
    [getFeatureItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeatureItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.featureItems = action.payload.results;
    },
    [getFeatureItems.rejected]: (state, payload) => {
      state.isLoading = false;
    },
  },
});

export default featureSlice.reducer;
