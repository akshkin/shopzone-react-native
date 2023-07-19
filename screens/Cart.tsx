import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  cartLoading,
  getCartProducts,
  selectCartItems,
  selectTotalPrice,
} from "../features/cart";
import CartItem from "../components/CartItem";
import LoadingOverlay from "../components/LoadingOverlay";
import Button from "../components/Button";

function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  const loading = useAppSelector(cartLoading);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  const numOfItems = cartItems.reduce(
    (acc, current) => acc + current.quantity,
    0
  );

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  if (loading) return <LoadingOverlay />;

  return (
    <>
      {!cartItems.length && <Text>Your Cart is empty</Text>}
      <FlatList
        data={cartItems}
        keyExtractor={(product) => product.productId}
        renderItem={({ item }) => <CartItem cartItem={item} />}
      />
      <View style={styles.priceDetails}>
        <Text style={styles.text}>Price details ({numOfItems} items)</Text>
        <Text style={styles.amount}>Total amount: SEK {totalPrice}</Text>
        <Button textColor="#fff" color="#006d77" onPress={() => {}}>
          Place order
        </Button>
      </View>
    </>
  );
}

export default Cart;

const styles = StyleSheet.create({
  priceDetails: {
    width: "100%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderTopWidth: 8,
    borderTopColor: "#ececed",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
});
