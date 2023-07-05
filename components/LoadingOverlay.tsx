import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="emerald" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingOverlay;
