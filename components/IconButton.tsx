import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color?: "#006d77";
  style?: any;
  onPress: () => void;
};

function IconButton({ icon, color, style, onPress }: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.button, style, styles.pressed]
          : [style, styles.button]
      }
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={24} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    // padding: 6,
  },
  pressed: {
    opacity: 0.5,
  },
});
