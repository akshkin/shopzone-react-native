import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Category from "./screens/Category";
import ProductDetail from "./screens/ProductDetail";
import Auth from "./screens/Auth";
import IconButton from "./components/IconButton";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { authToken, signOutUser } from "./features/auth";
import Favorites from "./screens/Favorites";
import Cart from "./screens/Cart";
import Search from "./screens/Search";
import { clearCartItems, clearCartItemsNoUser } from "./features/cart";
import Order from "./screens/Order";
import Header from "./components/Header";
import AllProducts from "./screens/AllProducts";

export type RootStackParamList = {
  Home: undefined;
  Category:
    | {
        category: string;
      }
    | undefined;
  ProductDetail: undefined | { productId: string };
  SignIn: undefined | { message: string };
  Favorites: undefined;
  Cart: undefined;
  Search: undefined;
  Order: undefined;
  AllProducts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const token = useAppSelector(authToken);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(signOutUser());
    setAuthenticated(false);
    setIsOpen(false);
    dispatch(clearCartItemsNoUser());
  };

  useEffect(() => {
    async function getToken() {
      const tokenFromStorage = await SecureStore.getItemAsync("token");
      if (tokenFromStorage) {
        setAuthenticated(true);
      }
      setIsAppReady(true);
    }
    getToken();
  }, [token]);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerRight: () => (
              <Header
                isOpen={isOpen}
                authenticated={authenticated}
                setIsOpen={setIsOpen}
                signOut={signOut}
              />
            ),
          })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="AllProducts" component={AllProducts} />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ title: "Search Products" }}
          />
          <Stack.Screen
            name="SignIn"
            component={Auth}
            options={{ title: "Authentication" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    opacity: 0.6,
  },
});
