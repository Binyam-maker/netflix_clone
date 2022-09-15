import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  myList: [],
  isLoading: false,
};

// export const addToMyList = createAsyncThunk(
//   "myList/addToMyList",
//   async (item, thunkApi) => {
//     try {
//       const resp = await axios.post("/api/addToMyList", item);
//       return resp.data;
//     } catch (error) {
//       thunkApi.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    clearMyList: (state) => {
      state.myList = [];
      state.isLoading = false;
    },

    addToMyList: (state, { payload }) => {
      state.myList = payload;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.myList = action.payload.myList.myList;
      state.isLoading = action.payload.myList.isLoading;
    },
  },
  //   extraReducers: {
  //     [addToMyList.pending]: (state) => {
  //       state.isLoading = true;
  //     },
  //     [addToMyList.fulfilled]: (state, { payload }) => {
  //       state.myList = payload;
  //       state.isLoading = false;
  //     },
  //     [addToMyList.rejected]: (state) => {
  //       state.isLoading = false;
  //       toast.error("Sorry, Item was not added to My-List");
  //     },
  //   },
});

export const { clearMyList, addToMyList } = myListSlice.actions;
export default myListSlice.reducer;
