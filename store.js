import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features/feature/featureSlice";
import authReducer from "./features/auth/authSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      feature: featureReducer,
      auth: authReducer,
    },
  });

export const wrapper = createWrapper(store);
