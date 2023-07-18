import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { FormFields, signIn } from "../api";
import { RootState } from "../store";

const initialState = {
  loading: false,
  error: "",
  token: "",
};

export const signInUser = createAsyncThunk(
  "auth/signin",
  async (formFields: FormFields) => {
    try {
      const response = await signIn(formFields);
      console.log(response.data.token);
      await SecureStore.setItemAsync("token", response.data.token);
      return response.data.token;
    } catch (error: any) {
      console.log(error.response.data);
      return Promise.reject(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signInUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authLoading = (state: RootState) => state.auth.loading;
export const authError = (state: RootState) => state.auth.error;
export const authToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
