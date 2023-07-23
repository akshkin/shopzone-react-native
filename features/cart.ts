import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "../types";
import { RootState } from "../store";
import {
  addToCart,
  clearCart,
  clearCartItem,
  getCart,
  removeFromCart,
} from "../api";

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
export const clearCartItems = createAsyncThunk("/cart/clear", async () => {
  try {
    const response = await clearCart();
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    // addToCartNoUser(state, action) {
    //   const cartItem: ProductType = action.payload;
    //   const existingItemInCart = state.cartItems.find(
    //     (item) => item.productId === cartItem._id
    //   );
    //   if (existingItemInCart && existingItemInCart.quantity) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((item) =>
    //         typeof item.quantity !== "undefined" &&
    //         item.productId === cartItem._id
    //           ? { ...item, productId: cartItem._id, quantity: item.quantity + 1, totalPrice: cartItem.price * cartItem.quantity! }
    //           : item
    //       ),
    //     };
    //   }
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems, { ...cartItem, productId: cartItem._id, quantity: 1, totalPrice: cartItem.price }],
    //   };
    // },
    // removeFromCartNoUser(state, action) {
    //   const id = action.payload;
    //   const itemInCart = state.cartItems.find((item) => item.productId === id);
    //   if (itemInCart?.quantity === 1) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.filter((cartItem) => cartItem.productId !== id),
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((cartItem) =>
    //         cartItem.productId === id
    //           ? { ...cartItem, productId: id , quantity: cartItem.quantity! - 1, totalPrice: cartItem.quantity * cartItem.product.price }
    //           : cartItem
    //       ),
    //     };
    //   }
    // },
    // clearFromCartNoUser(state, action) {
    //   const id = action.payload;
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.filter(
    //       (cartItem) => cartItem.productId !== id
    //     ),
    //   };
    // },
    clearCartItemsNoUser(state) {
      console.log("clearing...");
      state.cartItems = [];
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
      })
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = null;
        state.cartItems = [];
        state.totalPrice = 0;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cartItems.cartItems;
export const selectTotalPrice = (state: RootState) =>
  state.cartItems.totalPrice;
export const cartLoading = (state: RootState) => state.cartItems.loading;
export const { clearCartItemsNoUser } = cartSlice.actions;

// export const { addToCartNoUser, removeFromCartNoUser } = cartSlice.actions;

export default cartSlice.reducer;
