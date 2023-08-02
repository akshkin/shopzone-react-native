import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";

import IconButton from "./IconButton";
import CheckboxComponent from "./Checkbox";

const { width } = Dimensions.get("window");
const animation_duration = 300;

type FilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const sortOptions = [
  { label: "Select option", value: "" },
  { label: "Price falling", value: "price_desc" },
  { label: "Price rising", value: "price_asc" },
  { label: "Rating falling", value: "rating_desc" },
  { label: "Rating rising", value: "rating_asc" },
];
function Filter({ isOpen, setIsOpen }: FilterProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState(sortOptions);
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
      <IconButton icon="close-outline" onPress={() => setIsOpen(false)} />
      <DropDownPicker
        open={dropdownOpen}
        value={selectedOption}
        items={options}
        setOpen={setDropdownOpen}
        setValue={setSelectedOption}
      />
      <CheckboxComponent />
    </Animated.View>
  );
}

export default Filter;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    width: "70%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 200,
  },
});
