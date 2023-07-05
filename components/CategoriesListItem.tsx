import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

type ItemProps = {
  category: string;
  imageUrl: string;
  route: string;
};

function CategoriesListItem({ item }: { item: ItemProps }) {
  const navigation = useNavigation();
  const { category, imageUrl } = item;

  function routeToCategory() {
    navigation.navigate("Category");
  }

  return (
    <TouchableOpacity style={styles.container} onPress={routeToCategory}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "50%",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 8,
    left: "30%",
    borderWidth: 2,
    borderEndColor: "black",
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default CategoriesListItem;
