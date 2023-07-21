import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoriesList from "../components/CategoriesList";
const heroImg = require("../assets/hero.jpg");

function Home() {
  return (
    <ScrollView>
      <Image resizeMode="cover" style={styles.heroImage} source={heroImg} />
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
