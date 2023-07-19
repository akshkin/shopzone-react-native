import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { ProductType } from "../types";
import { fetchProductDetails } from "../api";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "../components/LoadingOverlay";
import Button from "../components/Button";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addProductToCart } from "../features/cart";
import * as SecureStore from "expo-secure-store";
import { addProductToFavorites } from "../features/favorites";

type ProductDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetail"
>;

function ProductDetail({ route, navigation }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

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

  function addToCart(item: ProductType) {
    dispatch(addProductToCart({ cartItem: item }));
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
        <Button color="#83c5be" onPress={toggleFavorites}>
          Favorite
        </Button>
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
    marginVertical: 10,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});

export default ProductDetail;
