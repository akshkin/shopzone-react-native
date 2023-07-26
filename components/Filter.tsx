import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";
import { StyleSheet, Text } from "react-native";

const { width } = Dimensions.get("window");
const animation_duration = 300;

type FilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Filter({ isOpen, setIsOpen }: FilterProps) {
  const drawerAnimation = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    isOpen
      ? Animated.spring(drawerAnimation, {
          toValue: isOpen ? 0 : -width,
          useNativeDriver: true,
        }).start()
      : Animated.timing(drawerAnimation, {
          toValue: -width,
          useNativeDriver: true,
          duration: animation_duration,
        }).start(() => setIsOpen(false));
  }, [isOpen, drawerAnimation]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: drawerAnimation }] },
      ]}
    >
      <Text>Filter</Text>
      <Pressable onPress={() => setIsOpen(false)}>
        <Text>Close</Text>
      </Pressable>
    </Animated.View>
  );
}

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    backgroundColor: "white",
  },
});
