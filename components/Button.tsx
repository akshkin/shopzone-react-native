import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  color: string;
  textColor?: string;
};

function Button({ children, onPress, color, textColor }: ButtonProps) {
  const containerStyle = { ...styles.container, backgroundColor: color };

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.pressed, containerStyle] : containerStyle
      }
      onPress={onPress}
    >
      <View>
        <Text style={{ ...styles.text, color: textColor }}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    // width: "47%",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
