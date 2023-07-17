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

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                // <Avatar
                //   size={32}
                //   rounded
                //   icon={{ name: "person", type: "font-awesome" }}
                //   containerStyle={{ backgroundColor: "#9700b9" }}
                //   onPress={() => navigation.navigate("SignIn")}
                // />
                // <Ionicons
                //   name="person-circle-outline"
                //   size={30}
                //   color="black"
                // />
                <IconButton
                  icon="person-circle-outline"
                  onPress={() => navigation.navigate("SignIn")}
                />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
