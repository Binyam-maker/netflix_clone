import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { HYDRATE } from "next-redux-wrapper";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkApi) => {
    try {
      const resp = await axios.post("/api/register", user);
      console.log("resp.data", resp.data);
      return resp.data;
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
    removeUser: (state) => {
      state.user = {};
    },
  },
  extraReducers: {
    // [HYDRATE]: (state, action) => {
    //   if (!action.payload.auth.name) {
    //     return state;
    //   }
    //   (state.name = action.payload.auth.name),
    //     (state.email = action.payload.auth.email),
    //     (state.password = action.payload.auth.password),
    //     (state.isLoading = action.payload.auth.isLoading);
    // },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      console.log("user", user);
      state.user = { ...user };
      state.isLoading = false;
      toast.success(`Hello, ${state.user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      toast.error(`Error : ${payload}`);
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
