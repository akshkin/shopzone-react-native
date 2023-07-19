import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "../types";
import { RootState } from "../store";
import { addToCart, clearCartItem, getCart, removeFromCart } from "../api";

const initialState: Cart = {
  loading: false,
  cartItems: [],
  error: null,
  totalPrice: 0,
};
export type CartItemType = {
  productId: string;
  product: ProductType;
  quantity: number;
  totalPrice: number;
};

type Cart = {
  loading: boolean;
  cartItems: CartItemType[];
  error: null | string;
  totalPrice: number;
};

export const addProductToCart = createAsyncThunk(
  "/cart/add",
  async ({ cartItem }: { cartItem: ProductType }) => {
    try {
      const response = await addToCart({
        cartItem: cartItem,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "/cart/remove",
  async ({ id }: { id: string }) => {
    try {
      const response = await removeFromCart({ id });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const clearProductFromCart = createAsyncThunk(
  "/cart/clearItem",
  async ({ id }: { id: string }) => {
    try {
      const response = await clearCartItem({ id });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const getCartProducts = createAsyncThunk("/cart/get", async () => {
  try {
    const response = await getCart();
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCartNoUser(state, action) {
      console.log(action.payload);
      console.log(state.cartItems);
      state.cartItems.push(action.payload);
      // state.cartItems.map((item) => {
      //   console.log(item);
      //   console.log("Adding");
      //   if (item === action.payload) {
      //     return (state.cartItems = [
      //       ...state.cartItems,
      //       {
      //         ...item,
      //         quantity: item.quantity + 1,
      //         totalPrice: item.price * item.quantity,
      //       },
      //     ]);
      //   }
      //   console.log("adding to cart");
      //   return (state.cartItems = [
      //     ...state.cartItems,
      //     { ...action.payload, quantity: 1 },
      //   ]);
      // });
    },
    removeFromCartNoUser(state, action) {
      state.cartItems.map((item) => {
        if (item.quantity > 1) {
          return (state.cartItems = [
            ...state.cartItems,
            { ...action.payload, quantity: item.quantity - 1 },
          ]);
        }
        return state.cartItems.filter(
          (item) => item.product._id !== action.payload
        );
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(clearProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = null;
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cartItems.cartItems;
export const selectTotalPrice = (state: RootState) =>
  state.cartItems.totalPrice;
export const cartLoading = (state: RootState) => state.cartItems.loading;

export const { addToCartNoUser, removeFromCartNoUser } = cartSlice.actions;

export default cartSlice.reducer;
