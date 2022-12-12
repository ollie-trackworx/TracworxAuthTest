import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../reducers/auth_reducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
