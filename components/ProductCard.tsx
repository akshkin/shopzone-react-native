import React from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { ProductType } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type ProductProps = {
  product: ProductType;
};

function ProductCard({ product }: ProductProps) {
  const navigation = useNavigation();
  const { title, rating, image, price } = product;

  {
    /* <Ionicons name="ios-heart" size={24} color="black" />
      <Ionicons name="ios-cart-sharp" size={24} color="black" />
    */
  }

  function handlePress() {
    navigation.navigate("ProductDetail", { productId: product._id });
  }

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.heartIcon}
        name="heart-outline"
        size={28}
        color="black"
      />
      <Ionicons
        style={styles.cartIcon}
        name="ios-cart-outline"
        size={28}
        color="black"
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
    bottom: 12,
  },
  cartIcon: {
    position: "absolute",
    zIndex: 10,
    right: 40,
    bottom: 12,
  },
});

export default ProductCard;
