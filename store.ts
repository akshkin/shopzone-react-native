import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
import favorites from "./features/favorites";

export const store = configureStore({
  reducer: {
    auth: auth,
    favorites: favorites,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
