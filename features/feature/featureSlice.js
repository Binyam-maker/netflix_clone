import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

// random number generator b/n intervals
const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const initialState = {
  featureItems: {},
  featureItem: {},
  isLoading: true,
};

// export const getFeatureItems = createAsyncThunk(
//   "discover/getFeatureItems",
//   async () => {
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    addFeatureItems: (state, action) => {
      state.featureItems = action.payload.results;
      state.featureItem = state.featureItems[randomIntFromInterval(0, 20)];
      state.isLoading = false;
    },
    clearFeature: (state) => {
      state.featureItems = [];
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.feature.featureItems) {
        return state;
      }
      (state.featureItems = action.payload.feature.featureItems),
        (state.featureItem = action.payload.feature.featureItem),
        (state.isLoading = false);
    },
  },
});

export const { addFeatureItems, clearFeature } = featureSlice.actions;
export default featureSlice.reducer;
