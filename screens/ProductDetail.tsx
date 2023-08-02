import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { ProductType } from "../types";
import { fetchProductDetails } from "../api";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "../components/LoadingOverlay";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { addProductToCart } from "../features/cart";
import * as SecureStore from "expo-secure-store";
import { addProductToFavorites, selectFavorites } from "../features/favorites";
import IconButton from "../components/IconButton";

type ProductDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetail"
>;

function ProductDetail({ route, navigation }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const isFavorite = favorites.find(
    (favorite) => favorite.productId === product?._id
  );

  const productId = route.params?.productId;

  useEffect(() => {
    async function getProduct() {
      if (productId) {
        setLoading(true);
        const response = await fetchProductDetails(productId);
        if (response.status !== 200) {
          setLoading(false);
          setError("Something went wrong");
        }
        setLoading(false);
        setProduct(response.data);
      }
    }
    getProduct();
  }, [productId]);

  useEffect(() => {
    navigation.setOptions({
      title: product?.title,
    });
  }, [product]);

  async function addToCart(item: ProductType) {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      dispatch(addProductToCart({ cartItem: item }));
    } else {
      navigation.navigate("SignIn", {
        message:
          "We are working on the functionality of adding products to cart without logging in. Thank you for your patience.",
      });
    }
  }

  async function toggleFavorites() {
    const token = await SecureStore.getItemAsync("token");
    if (token && product) {
      dispatch(addProductToFavorites({ item: product }));
    } else {
      navigation.navigate("SignIn", { message: "You must log in first" });
    }
  }

  if (!productId) return <></>;

  if (loading) return <LoadingOverlay />;

  if (error) return <Text>{error}</Text>;

  return (
    <>
      <ScrollView>
        <Image style={styles.image} source={{ uri: product?.image }} />
        <IconButton
          icon={isFavorite ? "ios-heart" : "heart-outline"}
          onPress={toggleFavorites}
          color="red"
          style={styles.heartIcon}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.rating}>
            {product?.rating.rate}{" "}
            <Ionicons name="star" size={18} color="black" /> (
            {product?.rating.count})
          </Text>
          <Text style={styles.price}>SEK {product?.price}</Text>
          <Text>{product?.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          textColor="white"
          color="#006d77"
          onPress={() => product && addToCart(product)}
        >
          Add to Cart
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 10,
  },
  buttonsContainer: {
    margin: 10,
  },
  heartIcon: {
    position: "absolute",
    zIndex: 10,
    right: 10,
    top: 12,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 4,
  },
});

export default ProductDetail;
