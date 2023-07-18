import React from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { ProductType } from "../types";
import { useNavigation } from "@react-navigation/native";
import IconButton from "./IconButton";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { addProductToFavorites, selectFavorites } from "../features/favorites";
import * as SecureStore from "expo-secure-store";
import { addProductToCart } from "../features/cart";

type ProductProps = {
  product: ProductType;
};

function ProductCard({ product }: ProductProps) {
  const navigation = useNavigation();
  const { title, rating, image, price } = product;
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.find(
    (favorite) => favorite.productId === product._id
  );

  {
    /* <Ionicons name="ios-heart" size={24} color="black" />
      <Ionicons name="ios-cart-sharp" size={24} color="black" />
    */
  }

  async function toggleFavorites() {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      dispatch(addProductToFavorites({ item: product }));
    } else {
      navigation.navigate("SignIn", { message: "You must log in first" });
    }
  }

  function addItemToCart(item: ProductType) {
    dispatch(addProductToCart({ cartItem: item }));
  }

  function handlePress() {
    navigation.navigate("ProductDetail", { productId: product._id });
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon={isFavorite ? "ios-heart" : "heart-outline"}
        onPress={toggleFavorites}
        color="red"
        style={styles.heartIcon}
      />
      <IconButton
        icon="ios-cart-outline"
        onPress={() => addItemToCart(product)}
        style={styles.cartIcon}
      />

      <Pressable
        onPress={handlePress}
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
      >
        <Image style={styles.image} source={{ uri: image }} />
      </Pressable>
      <Text style={styles.title}>
        {title.substring(0, 20)}
        {title.length > 20 && "..."}
      </Text>
      <Text style={styles.price}>SEK {price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "45%",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    marginVertical: 8,
  },
  price: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  heartIcon: {
    position: "absolute",
    zIndex: 10,
    right: 5,
    top: 12,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 4,
  },
  cartIcon: {
    position: "absolute",
    zIndex: 10,
    right: 6,
    bottom: 12,
  },
});

export default ProductCard;
