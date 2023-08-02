import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
import favorites from "./features/favorites";
import cart from "./features/cart";

export const store = configureStore({
  reducer: {
    auth: auth,
    favorites: favorites,
    cartItems: cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
