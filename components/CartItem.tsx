import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  CartItemType,
  addProductToCart,
  clearProductFromCart,
  removeProductFromCart,
} from "../features/cart";
import IconButton from "./IconButton";
import { ProductType } from "../types";
import { useAppDispatch } from "../hooks/useAppDispatch";

function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const dispatch = useAppDispatch();
  const { product, quantity, totalPrice } = cartItem;

  function addItemToCart(product: ProductType) {
    dispatch(addProductToCart({ cartItem: product }));
  }
  function removeItemFromCart(id: string) {
    dispatch(removeProductFromCart({ id }));
  }

  function clearItemFromCart(id: string) {
    dispatch(clearProductFromCart({ id }));
  }

  function handlePress() {}
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>SEK {product.price}</Text>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="remove"
            onPress={() => removeItemFromCart(product._id)}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <IconButton
            icon="add"
            onPress={() => addItemToCart(cartItem.product)}
          />
        </View>
        <IconButton
          icon="trash-bin-outline"
          onPress={() => clearItemFromCart(product._id)}
        />
        <Text>Total Price: SEK {totalPrice}</Text>
      </View>
    </View>
  );
}

export default CartItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    margin: 4,
  },
  image: {
    width: "40%",
    height: 200,
    marginRight: 16,
  },
  innerContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantity: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
});
