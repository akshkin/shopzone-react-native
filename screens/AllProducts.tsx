import React, { useState, useEffect } from "react";
import { FlatList, Pressable, Text, StyleSheet } from "react-native";
import Filter from "../components/Filter";
import { fetchAllProducts } from "../api";
import { ProductType } from "../types";
import { AntDesign } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetchAllProducts();
      setProducts(response.data.products);
    }
    getProducts();
  }, []);

  return (
    <>
      {/* <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressed, styles.filter] : styles.filter
        }
        onPress={() => setIsOpen(true)}
      >
        <AntDesign name="filter" size={24} color="black" />
        <Text>Filter</Text>
      </Pressable> */}
      <FlatList
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
      />
      {isOpen && <Filter isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default AllProducts;

const styles = StyleSheet.create({
  filter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    margin: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});
