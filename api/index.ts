import axios from "axios";

export const API = axios.create({
  baseURL: "https://shopzone-server.onrender.com",
});

export type FormFields = {
  name?: string;
  email: string;
  password: string;
};

export const signIn = (formFields: FormFields) =>
  API.post(`/users/signin`, formFields);

export const fetchProductsByCategory = (category: string) =>
  API.get(`/products/category?category=${category}`);

export const fetchProductDetails = (id: string) => API.get(`/products/${id}`);
