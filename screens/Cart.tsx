import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  cartLoading,
  getCartProducts,
  selectCartItems,
} from "../features/cart";
import CartItem from "../components/CartItem";
import LoadingOverlay from "../components/LoadingOverlay";

function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  const loading = useAppSelector(cartLoading);
  const dispatch = useAppDispatch();

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
    </>
  );
}

export default Cart;
