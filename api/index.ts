import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ProductType } from "../types";

export const API = axios.create({
  baseURL: "https://shopzone-server.onrender.com",
});

API.interceptors.request.use(async (req) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export type FormFields = {
  name?: string;
  email: string;
  password: string;
};

export const fetchAllProducts = () => API.get("/products");

export const fetchProductsBySearch = (searchQuery: string) =>
  API.get(`/products/search?searchQuery=${searchQuery}`);

export const signIn = (formFields: FormFields) =>
  API.post(`/users/signin`, formFields);

export const signOut = () => API.post("/users/signout");

export const signUp = (formFields: FormFields) =>
  API.post("/users/signup", formFields);

export const fetchProductsByCategory = (category: string) =>
  API.get(`/products/category?category=${category}`);

export const fetchProductDetails = (id: string) => API.get(`/products/${id}`);

export const addToCart = ({ cartItem }: { cartItem: ProductType }) =>
  API.post("/cart/add", { cartItem });

export const removeFromCart = ({ id }: { id: string }) =>
  API.post("/cart/remove", { id });

export const clearCart = () => API.post("/cart/clear");

export const clearCartItem = ({ id }: { id: string }) =>
  API.post("/cart/clearItem", { id });

export const getCart = () => API.get("/cart/get");

export const addToFavorites = ({ item }: { item: ProductType }) =>
  API.post("/favorites/add", { item });

export const getFavorites = () => API.get("/favorites/get");
