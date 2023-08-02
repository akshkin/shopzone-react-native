import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoriesList from "../components/CategoriesList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Button from "../components/Button";
const heroImg = require("../assets/hero.jpg");

type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

function Home({ navigation }: HomeScreenNavigationProps) {
  return (
    <ScrollView>
      <Image resizeMode="cover" style={styles.heroImage} source={heroImg} />
      <Button
        color="#000"
        textColor="#fff"
        onPress={() => navigation.navigate("AllProducts")}
      >
        Click here to explore all products
      </Button>
      <CategoriesList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 400,
  },
  heroImage: {
    height: 400,
    width: "100%",
  },
});

export default Home;
