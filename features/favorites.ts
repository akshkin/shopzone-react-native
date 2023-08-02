import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "../types";
import { RootState } from "../store";
import { addToFavorites, getFavorites } from "../api";

const initialState: Favorites = {
  loading: false,
  error: null,
  favorites: [],
};

type Favorites = {
  loading: boolean;
  error: null | string;
  favorites: FavoriteItemType[];
};

type FavoriteItemType = {
  product: ProductType;
  productId: string;
};

export const addProductToFavorites = createAsyncThunk(
  "/favorites/add",
  async ({ item }: { item: ProductType }) => {
    try {
      const response = await addToFavorites({ item });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const getProductFavorites = createAsyncThunk(
  "/favorites/get",
  async () => {
    try {
      const response = await getFavorites();
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProductToFavorites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProductToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.favorites = action.payload.products;
      })
      .addCase(getProductFavorites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.favorites = action.payload.products;
      });
  },
});

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const favoritesLoading = (state: RootState) => state.favorites.loading;

export default favoritesSlice.reducer;
