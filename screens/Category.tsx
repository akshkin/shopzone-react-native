import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, FlatList } from "react-native";
import { RootStackParamList } from "../App";
import { fetchProductsByCategory } from "../api";
import { ProductType } from "../types";
import ProductCard from "../components/ProductCard";
import LoadingOverlay from "../components/LoadingOverlay";

type RouteProps = NativeStackScreenProps<RootStackParamList, "Category">;

function Category({ route, navigation }: RouteProps) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const category = route?.params?.category;

  useEffect(() => {
    async function getProducts() {
      if (category) {
        setLoading(true);
        const response = await fetchProductsByCategory(category);
        if (response.status !== 200) {
          setLoading(false);
          setError("Failed to fetch products");
          return;
        }
        setProducts(response.data.products);
        setError("");
        setLoading(false);
      }
    }
    getProducts();

    navigation.setOptions({
      title: category,
    });
  }, [category]);

  if (loading) return <LoadingOverlay />;

  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={products}
      keyExtractor={(product: ProductType) => product._id}
      renderItem={({ item }: { item: ProductType }) => (
        <ProductCard product={item} />
      )}
      numColumns={2}
    />
  );
}

export default Category;
