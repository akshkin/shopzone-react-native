import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Category from "./screens/Category";
import ProductDetail from "./screens/ProductDetail";
import Auth from "./screens/Auth";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/base/dist/Avatar/Avatar";
import IconButton from "./components/IconButton";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppSelector } from "./hooks/useAppDispatch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { authToken } from "./features/auth";

export type RootStackParamList = {
  Home: undefined;
  Category:
    | {
        category: string;
      }
    | undefined;
  ProductDetail: undefined | { productId: string };
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const newToken = useAppSelector(authToken);

  useEffect(() => {
    async function getToken() {
      // const token = await AsyncStorage.getItem("token");
      const token = await SecureStore.getItemAsync("token");
      console.log(token);

      if (token) {
        setAuthenticated(true);
      }
      setIsAppReady(true);
    }
    getToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  <IconButton
                    icon="person-circle-outline"
                    onPress={() => navigation.navigate("SignIn")}
                    style={styles.icon}
                  />
                  {authenticated && (
                    <>
                      <IconButton
                        icon="heart-outline"
                        onPress={() => {}}
                        style={styles.icon}
                      />
                      <IconButton icon="cart-outline" onPress={() => {}} />
                    </>
                  )}
                </>
              ),
            })}
          />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
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
});
