import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { HYDRATE } from "next-redux-wrapper";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkApi) => {
    try {
      console.log("registerUser", user);
      const resp = await axios.post("/api/register", { user });
      const newUser = resp.data;
      return newUser;
    } catch (error) {
      thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  user: {},
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
      state.isLoading = false;
    },
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      // after sign up is finished go to sign in page
      state.isLoading = false;
      signIn();
    },
    [registerUser.rejected]: (state, { payload }) => {
      toast.error(`Error : ${payload}`);
      state.isLoading = false;
    },
    [HYDRATE]: (state, action) => {
      state.user = action.payload.auth.user;
    },
  },
});

export const { clearUser, addUser } = authSlice.actions;

export default authSlice.reducer;
