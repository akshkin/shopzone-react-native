import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type OrderScreenNavigtionProps = NativeStackScreenProps<RootStackParamList>;

function Order({ navigation }: OrderScreenNavigtionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order placed!</Text>
      <Button
        textColor="#fff"
        color="#006d77"
        onPress={() => navigation.navigate("Home")}
      >
        Keep shopping!
      </Button>
    </View>
  );
}

export default Order;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
  },
});
