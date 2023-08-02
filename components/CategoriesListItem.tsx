import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { RootStackParamList } from "../App";

type ItemProps = {
  category: string;
  imageUrl: string;
  route: string;
};

type CategoryNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Category"
>;

function CategoriesListItem({ item }: { item: ItemProps }) {
  const navigation = useNavigation<CategoryNavigationProps>();
  const { category, imageUrl } = item;

  function routeToCategory() {
    navigation.navigate("Category", { category: category });
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
