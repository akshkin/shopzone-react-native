import { Input, Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";

function Auth() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
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
          />
        </>
      ) : null}

      <Input
        inputContainerStyle={styles.input}
        placeholder="Email address"
        label="Email address"
      />
      <Input
        inputContainerStyle={styles.input}
        secureTextEntry
        placeholder="Password"
        label="Password"
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
        title={isLoggingIn ? "Sign in" : "Sign up"}
        buttonStyle={styles.button}
        containerStyle={{
          width: "100%",
          padding: 8,
        }}
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
    backgroundColor: "rgb(0, 109, 119)",
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
