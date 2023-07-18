import React, { useState } from "react";
import { Input, Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { authError, authLoading, signInUser } from "../features/auth";

type AuthScreenProps = NativeStackScreenProps<RootStackParamList>;

function Auth({ navigation }: AuthScreenProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const error = useAppSelector(authError);
  const loading = useAppSelector(authLoading);
  const dispatch = useAppDispatch();

  function handleChange(name: string, value: string) {
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  }

  async function handleSubmit() {
    try {
      dispatch(signInUser(formFields));
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <Text h3 style={styles.heading}>
        {isLoggingIn ? "Sign in!" : "Sign up!"}
      </Text>
      {!isLoggingIn ? (
        <>
          <Input
            inputContainerStyle={styles.input}
            placeholder="Name"
            label="Name"
            onChangeText={(value) => handleChange("name", value)}
          />
        </>
      ) : null}

      <Input
        inputContainerStyle={styles.input}
        placeholder="Email address"
        label="Email address"
        onChangeText={(value) => handleChange("email", value)}
      />
      <Input
        inputContainerStyle={styles.input}
        secureTextEntry
        placeholder="Password"
        label="Password"
        onChangeText={(value) => handleChange("password", value)}
      />

      {!isLoggingIn ? (
        <Input
          secureTextEntry
          inputContainerStyle={styles.input}
          placeholder="Confirm password"
          label="Confirm Password"
        />
      ) : null}
      <Button
        title={loading ? "Loading..." : isLoggingIn ? "Sign in" : "Sign up"}
        buttonStyle={styles.button}
        containerStyle={{
          width: "100%",
          padding: 8,
        }}
        onPress={handleSubmit}
      />
      <View style={styles.changeLogin}>
        <Text style={{ textAlign: "center" }}>
          {isLoggingIn ? "Don't have an account" : "Already have an account"}?
        </Text>
        <Pressable
          onPress={() => setIsLoggingIn((prevLogginIn) => !prevLogginIn)}
          style={{}}
        >
          <Text style={{ borderBottomWidth: 1 }}>
            {isLoggingIn ? "Sign up" : "Sign in"}
          </Text>
        </Pressable>
      </View>
      {error && <Text>{error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    padding: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#006d77",
    paddingVertical: 16,
  },
  changeLogin: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginBottom: 24,
  },
});

export default Auth;
