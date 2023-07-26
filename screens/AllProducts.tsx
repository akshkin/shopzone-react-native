import React, { useState, useEffect } from "react";
import { FlatList, Pressable, Text } from "react-native";
import Filter from "../components/Filter";
import { fetchAllProducts } from "../api";
import { ProductType } from "../types";
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
      {/* <Pressable onPress={() => setIsOpen(true)}>
        <Text>open</Text>
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
