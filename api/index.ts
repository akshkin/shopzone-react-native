import axios from "axios";

export const API = axios.create({
  baseURL: "https://shopzone-server.onrender.com",
});

export const fetchProductsByCategory = (category: string) =>
  API.get(`/products/category?category=${category}`);
