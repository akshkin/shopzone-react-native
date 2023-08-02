import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { FormFields, signIn, signOut, signUp } from "../api";
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
      console.log(error.response.data.message);
      Promise.reject(error);
      return error.response.data;
    }
  }
);
export const signUpUser = createAsyncThunk(
  "auth/signup",
  async (formFields: FormFields) => {
    try {
      const response = await signUp(formFields);
      await SecureStore.setItemAsync("token", response.data.token);
      return response.data.token;
    } catch (error: any) {
      console.log(error.response.data);
      Promise.reject(error);
      return error.response.data;
    }
  }
);

export const signOutUser = createAsyncThunk("auth/signout", async () => {
  try {
    await signOut();
    await SecureStore.deleteItemAsync("token");
  } catch (error: any) {
    console.log(error.response.data);
    Promise.reject(error);
    return error.response.data.message;
  }
});

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
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOutUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = "";
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authLoading = (state: RootState) => state.auth.loading;
export const authError = (state: RootState) => state.auth.error;
export const authToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
