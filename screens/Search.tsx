import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { fetchProductsBySearch } from "../api";
import { ProductType } from "../types";
import ProductCard from "../components/ProductCard";
import LoadingOverlay from "../components/LoadingOverlay";

function Search() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await fetchProductsBySearch(search);
      setProducts(response.data);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <View>
      <TextInput
        value={search}
        style={styles.textInput}
        onChangeText={(value) => setSearch(value)}
        onEndEditing={handleSubmit}
      />
      {loading ? (
        <LoadingOverlay />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(product) => product._id}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
        />
      ) : (
        <Text style={styles.text}>
          No results found. Please try another search!
        </Text>
      )}
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6b6969",
    margin: 8,
    fontSize: 16,
    padding: 4,
    paddingLeft: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});
