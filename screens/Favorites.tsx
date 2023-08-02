import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  favoritesLoading,
  getProductFavorites,
  selectFavorites,
} from "../features/favorites";
import ProductCard from "../components/ProductCard";
import LoadingOverlay from "../components/LoadingOverlay";

function Favorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const loading = useAppSelector(favoritesLoading);

  useEffect(() => {
    dispatch(getProductFavorites());
  }, []);

  if (loading) return <LoadingOverlay />;

  return (
    <>
      {!favorites.length && <Text>No Favorites added</Text>}
      <FlatList
        data={favorites}
        keyExtractor={(favorite) => favorite.productId}
        renderItem={({ item }) => <ProductCard product={item.product} />}
        numColumns={2}
      />
    </>
  );
}

export default Favorites;
