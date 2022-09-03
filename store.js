import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features/feature/featureSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      feature: featureReducer,
    },
  });

export const wrapper = createWrapper(store);
