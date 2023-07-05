import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import { ProductType } from "../types";
import { fetchProductDetails } from "../api";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "../components/LoadingOverlay";

type ProductDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetail"
>;

function ProductDetail({ route, navigation }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (!productId) return <></>;

  if (loading) return <LoadingOverlay />;

  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product?.image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.rating}>
          {product?.rating.rate}{" "}
          <Ionicons name="star" size={18} color="black" /> (
          {product?.rating.count})
        </Text>
        <View style={styles.buttonsContainer}>
          <Button title="Favorite" color="black" />
          <Button title="Add to Cart" />
        </View>
        <Text style={styles.price}>SEK {product?.price}</Text>
        <Text>{product?.description}</Text>
      </View>
    </ScrollView>
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
  },
});

export default ProductDetail;
