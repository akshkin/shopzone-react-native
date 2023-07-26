import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { fetchProductsBySearch } from "../api";
import { ProductType } from "../types";
import ProductCard from "../components/ProductCard";
import LoadingOverlay from "../components/LoadingOverlay";
import IconButton from "../components/IconButton";

function Search() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(true);
  }

  useLayoutEffect(() => {
    setSubmitted(false);
  }, []);

  return (
    <View>
      <View style={styles.searchBar}>
        <TextInput
          value={search}
          style={styles.textInput}
          onChangeText={(value) => setSearch(value)}
          onEndEditing={handleSubmit}
        />
        <IconButton
          size={30}
          style={styles.clearButton}
          icon="backspace-outline"
          onPress={() => setSearch("")}
        />
      </View>
      {loading ? (
        <LoadingOverlay />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(product) => product._id}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
        />
      ) : null}
      {!products.length && submitted ? (
        <Text style={styles.text}>
          No results found. Please try another search!
        </Text>
      ) : null}
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6b6969",
    fontSize: 16,
    padding: 4,
    paddingLeft: 16,
    width: "85%",
    borderRightWidth: 0,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  clearButton: {
    backgroundColor: "#fff",
    height: "100%",
    width: "10%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#6b6969",
  },
});
