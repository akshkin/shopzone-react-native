import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import IconButton from "./IconButton";
import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HeaderProps = {
  authenticated: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  signOut: () => void;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "SignIn">;

function Header({ authenticated, isOpen, setIsOpen, signOut }: HeaderProps) {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  const showFavoritesIcon = route.name !== "Favorites";
  const showSearchIcon = route.name !== "Search";
  const showCartIcon = route.name !== "Cart";
  const showAvatarIcon = route.name !== "SignIn";

  return (
    <>
      {showSearchIcon && (
        <IconButton
          icon="search-outline"
          style={styles.icon}
          onPress={() => navigation.navigate("Search")}
        />
      )}
      {showAvatarIcon && (
        <IconButton
          icon="person-circle-outline"
          onPress={
            authenticated
              ? () => setIsOpen((prevOpen) => !prevOpen)
              : () => navigation.navigate("SignIn")
          }
          style={styles.icon}
        />
      )}

      {showCartIcon && (
        <IconButton
          icon="cart-outline"
          style={styles.icon}
          onPress={() => navigation.navigate("Cart")}
        />
      )}
      {authenticated && (
        <>
          {showFavoritesIcon && (
            <IconButton
              icon="heart-outline"
              onPress={() => navigation.navigate("Favorites")}
              style={styles.icon}
            />
          )}
        </>
      )}
      {isOpen && (
        <Pressable
          onPress={signOut}
          style={({ pressed }) =>
            pressed
              ? [styles.pressed, styles.signOutContainer]
              : styles.signOutContainer
          }
        >
          <Text>Sign out</Text>
        </Pressable>
      )}
    </>
  );
}

export default Header;

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  signOutContainer: {
    position: "absolute",
    top: 15,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 4,
    margin: 4,
    zIndex: 20,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});
