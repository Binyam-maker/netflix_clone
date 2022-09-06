import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      console.log("payload", payload);
      const user = payload.data;
      console.log("user", user);

      state.user = { name: user.name, email: user.email, id: user._id };
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
